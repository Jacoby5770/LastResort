import os
import unittest
import subprocess
import json
from scrapy.http import HtmlResponse, Request
from GradeScraper.spiders import grades

def fakeResponse(filepath, url):
    request = Request(url=url)
    with open(filepath, 'r') as file:
        fileData = file.read()
    response = HtmlResponse(url=url, request=request, body=fileData, encoding='utf-8')
    return response

class SpiderTest(unittest.TestCase):

    def setUp(self):
        self.spider = grades.GradesSpider()
        self.homePage = fakeResponse(os.path.join('ResponseFiles', 'home.txt'), 'https://brightspace.vanderbilt.edu/d2l/home')
        self.classToProgress = fakeResponse(os.path.join('ResponseFiles', 'classtoprogress.txt'), 'https://brightspace.vanderbilt.edu/d2l/home/85892')
        self.classToGrades = fakeResponse(os.path.join('ResponseFiles', 'classtogrades.txt'), 'https://brightspace.vanderbilt.edu/d2l/le/content/108615/Home')
        self.progressPage = fakeResponse(os.path.join('ResponseFiles', 'progress.txt'), 'https://brightspace.vanderbilt.edu/d2l/le/userprogress/30667/85892/Summary?searchString=&sortField=LastName&sortDirection=0')
        self.gradesPage = fakeResponse(os.path.join('ResponseFiles', 'grades.txt'), 'https://brightspace.vanderbilt.edu/d2l/lms/grades/my_grades/main.d2l?ou=108615')

    def testParseHome(self):
        results = self.spider._parseHomeForTest(self.homePage)
        classes = {'https://brightspace.vanderbilt.edu/d2l/home/85892',
                   'https://brightspace.vanderbilt.edu/d2l/home/108615',
                   'https://brightspace.vanderbilt.edu/d2l/home/85896',
                   'https://brightspace.vanderbilt.edu/d2l/home/85862',
                   'https://brightspace.vanderbilt.edu/d2l/home/85856'}
        classCount = 0
        for URL in results:
            self.assertTrue(URL in classes)
            classCount += 1
        self.assertEqual(classCount, len(classes))

    def testParseClassURL(self):
        gradesURL = self.spider._parseClassURLForTest(self.classToGrades)
        progressURL = self.spider._parseClassURLForTest(self.classToProgress)
        self.assertEqual(progressURL, self.progressPage.url)
        self.assertEqual(gradesURL, self.gradesPage.url)

    def testParseGrades(self):
        data = self.spider.parseGrades(self.gradesPage)
        self.assertIsNotNone(data['grades'])
        self.assertIsNotNone(data['grades']['className'])
        self.assertEqual(data['grades']['Homework 1']['grade'], '96.67 %')
        self.assertIsNone(data['grades']['Homework 1']['achieved'])
        self.assertEqual(data['grades']['Project 1']['grade'], '98 %')
        self.assertIsNone(data['grades']['Project 1']['total'])
        self.assertEqual(data['grades']['Exam 1']['grade'], '89 %')

    def testParseClassProgress(self):
        data = self.spider.parseClassProgress(self.progressPage)
        self.assertIsNotNone(data['grades'])
        self.assertIsNotNone(data['grades']['className'])
        self.assertEqual(data['grades']['Git Class Exercise ']['grade'], 'A')
        self.assertEqual(data['grades']['Git Class Exercise ']['achieved'], '10')
        self.assertEqual(data['grades']['Asgn 3']['grade'], 'B-')
        self.assertEqual(data['grades']['Asgn 3']['achieved'], '8.1')
        self.assertEqual(data['grades']['Dev Env Asgn']['total'], '10')

    def integrationTest(self):
        with open('output.json', 'r') as gradeData:
            grades = json.loads(gradeData.read())
            self.assertEqual(len(grades), 5)
            self.assertEqual(len(grades[0]['grades']), 7)
            self.assertEqual(grades[1]['grades']['className'], 'CS 3250-01 Algorithms (2018F)')
            self.assertEqual(len(grades[2]['grades']), 8)
            self.assertEqual(len(grades[-1]['grades']), 13)

if __name__ == '__main__':
    unittest.main()