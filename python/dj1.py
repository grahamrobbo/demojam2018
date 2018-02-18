# -*- encoding: UTF-8 -*-
""" Record some sensors values and write them into a file.

"""

# MEMORY_VALUE_NAMES is the list of ALMemory values names you want to save.
ALMEMORY_KEY_NAMES = [
"Device/SubDeviceList/HeadYaw/Position/Sensor/Value",
"Device/SubDeviceList/HeadPitch/Position/Sensor/Value",
"Device/SubDeviceList/RShoulderRoll/Position/Sensor/Value",
"Device/SubDeviceList/RShoulderPitch/Position/Sensor/Value",
"Device/SubDeviceList/LShoulderRoll/Position/Sensor/Value",
"Device/SubDeviceList/LShoulderPitch/Position/Sensor/Value",
"Device/SubDeviceList/RElbowYaw/Position/Sensor/Value",
"Device/SubDeviceList/RElbowRoll/Position/Sensor/Value",
"Device/SubDeviceList/LElbowYaw/Position/Sensor/Value",
"Device/SubDeviceList/LElbowRoll/Position/Sensor/Value",
"Device/SubDeviceList/RWristYaw/Position/Sensor/Value",
"Device/SubDeviceList/LWristYaw/Position/Sensor/Value",
"Device/SubDeviceList/RHand/Position/Sensor/Value",
"Device/SubDeviceList/LHand/Position/Sensor/Value",
"Device/SubDeviceList/RHipYawPitch/Position/Sensor/Value",
"Device/SubDeviceList/RHipRoll/Position/Sensor/Value",
"Device/SubDeviceList/RHipPitch/Position/Sensor/Value",
"Device/SubDeviceList/LHipYawPitch/Position/Sensor/Value",
"Device/SubDeviceList/LHipRoll/Position/Sensor/Value",
"Device/SubDeviceList/LHipPitch/Position/Sensor/Value",
"Device/SubDeviceList/RKneePitch/Position/Sensor/Value",
"Device/SubDeviceList/LKneePitch/Position/Sensor/Value",
"Device/SubDeviceList/RAnkleRoll/Position/Sensor/Value",
"Device/SubDeviceList/RAnklePitch/Position/Sensor/Value",
"Device/SubDeviceList/LAnkleRoll/Position/Sensor/Value",
"Device/SubDeviceList/LAnklePitch/Position/Sensor/Value",
"rightFootTotalWeight",
"leftFootTotalWeight"
]

ROBOT_IP = "russel"
HTTP_ENDPOINT = "http://was.yelcho.com.au:8000/sap/dj2018" #"http://was.yelcho.com.au:8000/sap/public/ping"

import os
import sys
import time
from datetime import datetime
import json
import requests

from naoqi import ALProxy

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

def readRobotData(memory):
    """ Read the data from ALMemory.
    Returns a key/value hash table
    """
    robotData = {}
    shortKey = ''
    for key in ALMEMORY_KEY_NAMES:
        try:
            shortKey = key.split('/')[2]
        except IndexError:
            shortKey = key
        robotData[shortKey] = memory.getData(key)
    robotData['now'] = datetime.now()
    return robotData

def jsonify(list):
    # simple = dict(now=datetime.now(),
    #           readings=list)
    # list['now'] = datetime.now()
    print json.dumps(list, cls=DateTimeEncoder)

def recordData(nao_ip):
    """ Record the data from ALMemory.
    Returns a matrix of values

    """
    print "Recording data ..."
    memory = ALProxy("ALMemory", nao_ip, 9559)

    for i in range (1, 1000):
        r = requests.post(HTTP_ENDPOINT, headers=readRobotData(memory))
        #print "Status code is ", r.status_code
        time.sleep(0.05) #0.5)

def main():
    """ Parse command line arguments,
    run recordData and write the results
    into a csv file

    """
    if len(sys.argv) < 2:
        nao_ip = ROBOT_IP
    else:
        nao_ip = sys.argv[1]

    motion = ALProxy("ALMotion", nao_ip, 9559)
    # Set stiffness on for Head motors
    motion.setStiffnesses("Head", 1.0)
    # Will go to 1.0 then 0 radian
    # in two seconds
    motion.post.angleInterpolation(
        ["HeadYaw"],
        [1.0, 0.0],
        [1  , 2],
        False
    )
    recordData(nao_ip)

    # Gently set stiff off for Head motors
    motion.setStiffnesses("Head", 0.0)

    # output = os.path.abspath("data_recording.csv")

    # with open(output, "w") as fp:
    #     for line in data:
    #         fp.write("; ".join(str(x) for x in line))
    #         fp.write("\n")

    # print "Results written to", output


if __name__ == "__main__":
    main()