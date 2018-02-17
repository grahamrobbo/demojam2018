# -*- encoding: UTF-8 -*-
""" Record some sensors values and write them into a file.

"""

# MEMORY_VALUE_NAMES is the list of ALMemory values names you want to save.
ALMEMORY_KEY_NAMES = [
# "Device/SubDeviceList/HeadYaw/Position/Sensor/Value",
# "Device/SubDeviceList/HeadPitch/Position/Sensor/Value",
# "Device/SubDeviceList/RShoulderRoll/Position/Sensor/Value",
# "Device/SubDeviceList/RShoulderPitch/Position/Sensor/Value",
# "Device/SubDeviceList/LShoulderRoll/Position/Sensor/Value",
# "Device/SubDeviceList/LShoulderPitch/Position/Sensor/Value",
# "Device/SubDeviceList/RElbowYaw/Position/Sensor/Value",
# "Device/SubDeviceList/RElbowRoll/Position/Sensor/Value",
# "Device/SubDeviceList/LElbowYaw/Position/Sensor/Value",
# "Device/SubDeviceList/LElbowRoll/Position/Sensor/Value",
# "Device/SubDeviceList/RWristYaw/Position/Sensor/Value",
# "Device/SubDeviceList/LWristYaw/Position/Sensor/Value",
# "Device/SubDeviceList/RHipYawPitch/Position/Sensor/Value",
# "Device/SubDeviceList/RHipRoll/Position/Sensor/Value",
# "Device/SubDeviceList/RHipPitch/Position/Sensor/Value",
# "Device/SubDeviceList/LHipYawPitch/Position/Sensor/Value",
# "Device/SubDeviceList/LHipRoll/Position/Sensor/Value",
# "Device/SubDeviceList/LHipPitch/Position/Sensor/Value",
# "Device/SubDeviceList/RKneePitch/Position/Sensor/Value",
# "Device/SubDeviceList/LKneePitch/Position/Sensor/Value",
# "Device/SubDeviceList/RAnkleRoll/Position/Sensor/Value",
# "Device/SubDeviceList/RAnklePitch/Position/Sensor/Value",
# "Device/SubDeviceList/LAnkleRoll/Position/Sensor/Value",
# "Device/SubDeviceList/LAnklePitch/Position/Sensor/Value",
"rightFootTotalWeight",
"leftFootTotalWeight"
]

ROBOT_IP = "russel"

import os
import sys
import time
from datetime import datetime
import json

from naoqi import ALProxy

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

def readRobotData(memory):
    """ Read the data from ALMemory.
    Returns a matrix of values

    """
    reading = list()
    for key in ALMEMORY_KEY_NAMES:
        value = memory.getData(key)
        reading.append(dict(key = value))
    return reading

def jsonify(list):
    simple = dict(now=datetime.now(),
              readings=list)

    print json.dumps(simple, cls=DateTimeEncoder)

def recordData(nao_ip):
    """ Record the data from ALMemory.
    Returns a matrix of values

    """
    print "Recording data ..."
    memory = ALProxy("ALMemory", nao_ip, 9559)

    data = list()
    for i in range (1, 10):
        # line = list()
        # for key in ALMEMORY_KEY_NAMES:
        #     value = memory.getData(key)
        #     line.append(value)
        line = readRobotData(memory)
        jsonify(line)
        data.append(line)
        print json.dumps(line, cls=DateTimeEncoder)
        time.sleep(0.5)
    return data


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
    data = recordData(nao_ip)

    # Gently set stiff off for Head motors
    motion.setStiffnesses("Head", 0.0)

    output = os.path.abspath("data_recording.csv")

    with open(output, "w") as fp:
        for line in data:
            fp.write("; ".join(str(x) for x in line))
            fp.write("\n")

    print "Results written to", output


if __name__ == "__main__":
    main()