from flask import Flask, request, jsonify, Response
import subprocess
import os
import time
import signal

app = Flask(__name__)

# ssl_path = os.path.dirname(__file__).join("ssl")
# key_path = os.path.join(ssl_path, 'server.key')
# crt_path = os.path.join(ssl_path, 'server.crt')
# ssl_context = (crt_path, key_path)

@app.route('/')
def test():
    resp = Response("Flask is running")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/get-grades')
def scrape_data():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return "ERROR"
    spider_name = 'grades'
    splash = subprocess.Popen('docker run -p 8050:8050 scrapinghub/splash', shell=True, preexec_fn=os.setsid)
    time.sleep(5)
    subprocess.check_output('scrapy crawl grades -a username={} -a password={} -o output.json'.format(username, password), shell=True)
    os.killpg(os.getpgid(splash.pid), signal.SIGTERM)
    # if not splash.poll():
    #     print("SPLASH STOPPED")
    results = None
    with open('output.json') as items_file:
        results = items_file.read()
    os.remove('output.json')
    resp = Response(results)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/demo-grades')
def demo():
    with open('output1.json') as items_file:
        results = items_file.read()
    resp = Response(results)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp

if __name__=='__main__':
    # app.run(host='0.0.0.0', port=443, ssl_context=ssl_context)
    app.run(host='0.0.0.0', port=80)