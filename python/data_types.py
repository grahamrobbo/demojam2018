from datetime import datetime
import json

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

def get_data():

    simple = dict(now=datetime.now(),
 
              int_list=[1, 2, 3],
 
              text='string',
 
              number=3.44,
 
              boolean=True,
 
              none=None)	
    return simple

def main():
	print json.dumps(get_data(), cls=DateTimeEncoder)

if __name__ == "__main__":
    main()
