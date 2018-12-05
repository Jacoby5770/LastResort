from flask import Flask, request
import subprocess, os

app = Flask(__name__)

@app.route('/')
def test():
	return "Flask is working."

@app.route('/get-grades')
def scrape_data():
	username = request.args.get('username')
	password = request.args.get('password')
	if not username or not password:
		return "ERROR"
	spider_name = 'grades'
	subprocess.check_output('scrapy crawl grades -a username={} -a password={} -o output.json'.format(username, password), shell=True)
	results = None
	with open('output.json') as items_file:
		results = items_file.read()
	os.remove('output.json')
	return results

if __name__=='__main__':
	app.run(host='0.0.0.0', port=80)