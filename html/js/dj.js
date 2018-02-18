    Chart.prototype.addDataPoints = function () {
        if (!this._seq) {
            this._seq = 0;
        }
        this._seq++;
        for (var i = 0; i < arguments.length; i++) {
            try {
                if (this.data.datasets[i].data.length >= this.config.maxDatapoints) {
                    this.data.datasets[i].data.splice(0, 1);
                }
                this.data.datasets[i].data.push({
                    x: this._seq,
                    y: arguments[i]
                });
            } catch (e) {}
        }
        this.update();
    };

    function createChart(canvas) {
        return new Chart(canvas.getContext("2d"), oChartConfig[canvas.id.replace('chart', '')]);
    }
    var oCharts = {};
    window.onload = function () {
        var aCanvas = document.getElementsByTagName('canvas');
        for (var i = 0; i < aCanvas.length; i++) {
            oCharts[aCanvas[i].id.replace('chart', '')] = createChart(aCanvas[i]);
        }
    };
    /*
    Websocket handler
     */
    sap.ui.define(["sap/ui/core/ws/SapPcpWebSocket"]);
    var oWebSocket;

    function _setupWebsocketChannel() {
        // Check if WebSockets are supported
        if (!sap.ui.Device.support.websocket) {
            alert("WebSocket is not supported by your Browser!");
            return;
        }
        // Establish WebSocket Connection
        oWebSocket = new sap.ui.core.ws.SapPcpWebSocket('/sap/bc/apc/sap/ydj2018', sap.ui.core.ws.SapPcpWebSocket.SUPPORTED_PROTOCOLS.v10);
        // Register Callbacj Functions on WebSocket Events
        oWebSocket.attachOpen(function (oEvent) {
            console.log('Websocket connection opened!');
        });
        if (window.location.hostname !== 'localhost') {
            oWebSocket.attachClose(function (e) {
                console.log('Websocket connection closed');
                setTimeout(_setupWebsocketChannel, 1000);
            });
        }
        oWebSocket.attachMessage(function (oEvent) {
            // Message from server arrives
            if (oEvent.getParameter("pcpFields").errorText) {
                // Message is an error message
                console.error(oEvent.getParameter("pcpFields").errorText);
                return;
            }
            // Parse Message
            var oPCPFields = oEvent.getParameter('pcpFields');
            console.dir(oPCPFields);
            var sMsg = oEvent.getParameter("data");
            console.log('Msg=' + sMsg);
            try {
                oCharts.Head.addDataPoints(oPCPFields.headpitch, oPCPFields.headyaw);
            } catch (e) {
                console.error('Error adding content to Head chart');
            }
            // Format Timestamp
            //var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ style: "medium" });
            //oEntry.date = oFormat.format(new Date(oEntry.date));
            // update model
        });
        oWebSocket.attachClose(function (oEvent) {
            console.error('Websocket connection closed');
            // setTimeout(function () {
            //     this._setupWebsocketChannel();
            // }.bind(this), 1000);
        });
        oWebSocket.attachError(function (oEvent) {
            console.error('Websocket error');
        });
    }
    _setupWebsocketChannel();
    /*
    Test foring data at charts
     */
    var gSeed = 345;
    randomScalingFactor = function (min, max) {
        var seed = gSeed;
        min = min === undefined ? -340 : min;
        max = max === undefined ? 340 : max;
        gSeed = (seed * 9301 + 49297) % 233280;
        return min + (gSeed / 233280) * (max - min);
    };
    document.getElementById('addData').addEventListener('click', function () {
        // for (var i = 0; i < oCharts.length; i++) {
        //     oCharts[i].addDataPoints(randomScalingFactor(), randomScalingFactor());
        // }
        for (var property in oCharts) {
            if (oCharts.hasOwnProperty(property)) {
                oCharts[property].addDataPoints(randomScalingFactor(), randomScalingFactor());
            }
        }
    });
    document.getElementById('wsTest').addEventListener('click', WebSocketTest);