
HTTP_ENDPOINT = "http://was.yelcho.com.au:8000/sap/public/ping"

import requests

def main():
    print "HTTP test call to ", HTTP_ENDPOINT

    resp = requests.get(HTTP_ENDPOINT)

    print "Response code is ", resp.status_code
    print "Headers"
    print resp.headers
    print "Response content is ", resp.content

if __name__ == "__main__":
    main()