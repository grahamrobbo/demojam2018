# -*- encoding: UTF-8 -*-

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
import signal
import sys
import ssl
import threading
import time
import requests
import random
import json

from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer
from optparse import OptionParser
from datetime import datetime
from naoqi import ALProxy

clients = []
handlerRunning = False

class SimpleChat(WebSocket):

   def handleMessage(self):
      for client in clients:
         if client != self:
            client.sendMessage(self.address[0] + u' - ' + self.data)

   def handleConnected(self):
      print (self.address, 'connected')
      for client in clients:
         client.sendMessage(self.address[0] + u' - connected')
      clients.append(self)

   def handleClose(self):
      clients.remove(self)
      print (self.address, 'closed')
      for client in clients:
         client.sendMessage(self.address[0] + u' - disconnected')

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

def readRobotDataMock():
    robotData = {}
    shortKey = ''
    for key in ALMEMORY_KEY_NAMES:
        try:
            shortKey = key.split('/')[2]
        except IndexError:
            shortKey = key
        robotData[shortKey] = random.random()
    robotData['now'] = datetime.now()
    robotData['volume'] = 16
    return robotData

def recordDataMock():

    print "Using mock data ..."

    while True:
        #r = requests.post(HTTP_ENDPOINT, headers=readRobotDataMock())
        #print "Read"
        payload = json.dumps(readRobotDataMock(), cls=DateTimeEncoder)
        #print (payload)
        for client in clients:
           client.sendMessage(str(payload))
        time.sleep(0.3)

def readRobotData(memory,audiodevice):
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
    robotData['volume'] = audiodevice.getOutputVolume()
    return robotData

def recordData(nao_ip):

    print "Recording robot data ..."
    memory = ALProxy("ALMemory", nao_ip, 9559)

    memory.insertData('demojam2014/bellsSwell', '2 point 1 meters')
    memory.insertData('demojam2014/melbdesc', 'and slightly Cloudy')
    memory.insertData('demojam2014/melbtemp', 24)
    memory.insertData('demojam2014/pipelineSwell', '8 meters')

    audiodevice = ALProxy("ALAudioDevice", nao_ip, 9559)
    while True:
        payload = json.dumps(readRobotData(memory,audiodevice), cls=DateTimeEncoder)
        for client in clients:
           client.sendMessage(str(payload))
        time.sleep(0.3)

if __name__ == "__main__":

   parser = OptionParser(usage="usage: %prog [options]", version="%prog 1.0")
   parser.add_option("--host", default='', type='string', action="store", dest="host", help="hostname (localhost)")
   parser.add_option("--port", default=8000, type='int', action="store", dest="port", help="port (8000)")
   parser.add_option("--mock", default='false', type='string', action="store", dest="mock", help="--mock=true")

   (options, args) = parser.parse_args()

   server = SimpleWebSocketServer(options.host, options.port, SimpleChat)

   def close_sig_handler(signal, frame):
      server.close()
      sys.exit()

   signal.signal(signal.SIGINT, close_sig_handler)

   #server.serveforever()

   # Launch websockets server in background thread
   thread = threading.Thread(target=server.serveforever, args=())
   thread.daemon = True     # Daemonize thread
   thread.start()           # Start the execution

   print ('Starting server ...')
   if options.mock == 'false':
     recordData(ROBOT_IP)
   else:
     recordDataMock()
