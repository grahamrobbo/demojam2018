# -*- encoding: UTF-8 -*-


ROBOT_IP = "russel"

import sys

from naoqi import ALProxy

memory = ALProxy("ALMemory", ROBOT_IP, 9559)

memory.insertData('demojam2014/status', 'Stopped')
memory.insertData('demojam2014/bellsSwell', '2 point 1 meters')
memory.insertData('demojam2014/melbdesc', 'and slightly Cloudy')
memory.insertData('demojam2014/melbtemp', 24)
memory.insertData('demojam2014/pipelineSwell', '8 meters')

print('demojam2014/bellsSwell',memory.getData('demojam2014/bellsSwell'))
print('demojam2014/melbtemp',memory.getData('demojam2014/melbtemp'))
print('demojam2014/melbdesc',memory.getData('demojam2014/melbdesc'))
print('demojam2014/pipelineSwell',memory.getData('demojam2014/pipelineSwell'))

audiodevice = ALProxy("ALAudioDevice", ROBOT_IP, 9559)
print('Volume ', audiodevice.getOutputVolume())

