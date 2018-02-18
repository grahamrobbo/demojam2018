import time
import threading

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        print('Arrived',self.data)
        self.sendMessage(self.data)

    def handleConnected(self):
        print(self.address, 'connected')
        # thread = threading.Thread(target=startPing, args=())
        # thread.daemon = True                            # Daemonize thread
        # thread.start()                                  # Start the execution

    def handleClose(self):
        print(self.address, 'closed')

    def startPing():
    	while True:
        	print('Ping')
        	time.sleep(5)

server = SimpleWebSocketServer('', 8000, SimpleEcho)
server.serveforever()
