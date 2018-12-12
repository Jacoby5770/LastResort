# -*- coding: utf-8 -*-
import scrapy, re#, base64
try:
    from itertools import zip_longest
except ImportError:
    from itertools import izip_longest as zip_longest
from scrapy_splash import SplashRequest
from GradeScraper.items import GradeData

class GradesSpider(scrapy.Spider):
    name = 'grades'
    custom_settings = {
        'SPLASH_URL': 'http://localhost:8050', # 'http://192.168.99.100:8050/',
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy_splash.SplashCookiesMiddleware': 723,
            'scrapy_splash.SplashMiddleware': 725,
            'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
        },
        'SPIDER_MIDDLEWARES': {
            'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
        },
        'DUPEFILTER_CLASS': 'scrapy_splash.SplashAwareDupeFilter',
    }

    def __init__(self, username='default', password='default'):
        self.baseURL = 'https://brightspace.vanderbilt.edu'
        self.username = username
        self.password = password
        # self.password = (base64.b64decode(bytes(password, 'utf-8'))).decode('utf-8')
        # print(username, password)
        self.renderPage = """
        function main(splash, args)
            splash:init_cookies(args.cookies)
            assert(splash:go(args.url))
            assert(splash:wait(5))
            -- local entries = splash:history()
            -- local last_response = entries[#entries].response
            return {
                -- headers = last_response.headers,
                -- cookies = splash:get_cookies(),
                html = splash:html(),
            }
        end
        """
        self.renderGrades = """
        function main(splash, args)
            splash:init_cookies(args.cookies)
            assert(splash:go(args.url))
            assert(splash:wait(5))
            while not splash:select('th.d_gt.d_ich.d2l-table-cell-first label') do
                assert(splash:wait(0.5))
            end
            return {
                html = splash:html(),
            }
        end
        """
        self.expandGrades = """
        function main(splash, args)
            splash:init_cookies(args.cookies)
            assert(splash:go(args.url))
            assert(splash:wait(5))
            assert(splash:runjs('document.querySelector("div.d2l-collapsepane-header.d2l-collapsepane-collapsed").click()'))
            while not splash:select('div.d2l-datalist-container.d2l-datalist-style1.d2l-datalist-outdent') do
                assert(splash:wait(0.5))
            end
            return {
                html = splash:html(),
            }
        end
        """

    def start_requests(self):
        script = """
        function main(splash, args)
            assert(splash:go(args.url))
            assert(splash:wait(3))
            assert(splash:runjs('document.getElementById("username").value = "{}"; document.getElementById("password").value = "{}"; setTimeout(postOk(), 1000);'))
            assert(splash:wait(15))
            -- local entries = splash:history()
            -- local last_response = entries[#entries].response
            return {{
                -- headers = last_response.headers,
                cookies = splash:get_cookies(),
                html = splash:html(),
            }}
        end
        """.format(self.username, self.password)
        yield SplashRequest(
            r'https://brightspace.vanderbilt.edu/d2l/home',
            self.parseHome,
            endpoint='execute',
            args={'lua_source': script, 'timeout': 50},
            headers={'User-Agent': 'Mozilla/5.0'}
        )

    def parseHome(self, response):
        # with open("response.txt", 'w') as f:
        #     f.write(str(response.body))
        classURLs = response.css('d2l-tab-panel[aria-label="2018 Fall"] div.my-courses-content.style-scope.d2l-my-courses-content a.d2l-focusable.style-scope.d2l-card::attr(href)')
        # print(response.headers)
        self.headers = response.headers
        for href in classURLs:
            nextURL = self.baseURL+href.extract()
            print(nextURL)
            yield SplashRequest(
                nextURL,
                self.parseClassURL,
                endpoint='execute',
                args={'lua_source': self.renderPage, 'timeout': 50},
                headers=response.headers,
            )

    def _parseHomeForTest(self, response):
        classURLs = response.css('d2l-tab-panel[aria-label="2018 Fall"] div.my-courses-content.style-scope.d2l-my-courses-content a.d2l-focusable.style-scope.d2l-card::attr(href)')
        for href in classURLs:
            nextURL = self.baseURL+href.extract()
            yield nextURL

    def parseClassURL(self, response):
        # with open("response1.txt", 'w') as f:
        #     f.write(str(response.body))
        # print(response.headers)
        gradeURL = response.xpath('//a[@class="d2l-navigation-s-link" and text()="Grades"]/@href').extract_first()
        if gradeURL:
            gradeURL = gradeURL.replace('index', 'my_grades/main')
            print(self.baseURL+gradeURL)
            return SplashRequest(
                self.baseURL+gradeURL, 
                self.parseGrades,
                endpoint='execute',
                args={'lua_source': self.renderGrades, 'timeout': 50},
                headers=self.headers,
            )
        classProgressURL = response.xpath('//a[@class="d2l-navigation-s-link" and text()="Class Progress"]/@href').extract_first()
        if classProgressURL:
            print(self.baseURL+classProgressURL)
            return SplashRequest(
                self.baseURL+classProgressURL, 
                self.parseClassProgress,
                endpoint='execute',
                args={'lua_source': self.expandGrades, 'timeout': 50},
                headers=self.headers,
            )

    def _parseClassURLForTest(self, response):
        gradeURL = response.xpath('//a[@class="d2l-navigation-s-link" and text()="Grades"]/@href').extract_first()
        if gradeURL:
            gradeURL = gradeURL.replace('index', 'my_grades/main')
            return self.baseURL + gradeURL
        classProgressURL = response.xpath('//a[@class="d2l-navigation-s-link" and text()="Class Progress"]/@href').extract_first()
        if classProgressURL:
            return self.baseURL + classProgressURL

    def parseGrades(self, response):
        # with open("response2.txt", 'w') as f:
        #     f.write(str(response.body))
        data = GradeData()
        data['grades'] = dict()
        className = response.css('div.d2l-navigation-s-title-container a.d2l-navigation-s-link::text').extract_first()
        data['grades']['className'] = className
        for asgn, grade in zip_longest(response.css('th.d_gt.d_ich.d2l-table-cell-first label::text'), 
                                       response.css('td.d_gn.d_gr.d_gt.d2l-table-cell-last label::text')):
            if not asgn:
                break
            if grade:
                grade = grade.extract()
            data['grades'][asgn.extract()] = {'grade': grade, 'achieved': None, 'total': None}
        return data

    def parseClassProgress(self, response):
        # with open("response3.txt", 'w') as f:
        #     f.write(str(response.body))
        data = GradeData()
        data['grades'] = dict()
        className = response.css('div.d2l-navigation-s-title-container a.d2l-navigation-s-link::text').extract_first()
        data['grades']['className'] = className
        for asgn, grade, percentStr in zip_longest(response.css('div.js_UserGrade h4.d2l-heading.vui-heading-3.d2l-heading-none::text'), 
                                                   response.css('div.js_UserGrade span.d2l-textblock.d2l-textblock-strong::text'), 
                                                   response.css('div.d2l-textblock.js_Weight::text')):
            if not asgn:
                break
            if grade:
                grade = grade.extract()
            achieved = total = None
            percentages = list()
            if percentStr:
                percentages = re.findall(r'[0-9]+\.?[0-9]+', percentStr.extract())
            if len(percentages) == 2:
                total, achieved = percentages
            data['grades'][asgn.extract()] = {'grade': grade, 'achieved': achieved, 'total': total}
        return data
