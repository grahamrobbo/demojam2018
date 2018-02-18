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
    var aCharts = [];
    window.onload = function () {
        var aCanvas = document.getElementsByTagName('canvas');
        for (var i = 0; i < aCanvas.length; i++) {
            aCharts.push(createChart(aCanvas[i]));
        }
    };
    /*
    Websocket handler
     */
    function WebSocketTest() {
        if ("WebSocket" in window) {
            alert("WebSocket is supported by your Browser!");
            // Let us open a web socket
            var ws = new WebSocket("ws://localhost/sap/bc/apc/sap/ydj2018");
            ws.onopen = function () {
                // Web Socket is connected, send data using send()
                ws.send("Message to send");
                alert("Message is sent...");
            };
            ws.onmessage = function (evt) {
                var received_msg = evt.data;
                alert("Message is received...");
            };
            ws.onclose = function () {
                // websocket is closed.
                alert("Connection is closed...");
            };
            window.onbeforeunload = function (event) {
                socket.close();
            };
        } else {
            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
        }
    }
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
        for (var i = 0; i < aCharts.length; i++) {
            aCharts[i].addDataPoints(randomScalingFactor(), randomScalingFactor());
        }
    });
    document.getElementById('wsTest').addEventListener('click', WebSocketTest);
