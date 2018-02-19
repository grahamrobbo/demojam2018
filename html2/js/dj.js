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

    function updateActuals(oPCPFields) {
        const _defaultClass = 'actual';
        const _setActual = function (elem, newValue) {
            var oldValue = elem.innerHTML;
            elem.innerHTML = newValue;
            elem.classList.value = _defaultClass + (oldValue <= newValue ? ' actualMore' : ' actualLess');
        };
        for (var property in oPCPFields) {
            if (oPCPFields.hasOwnProperty(property)) {
                try {
                    _setActual(document.getElementById('actual_' + property), oPCPFields[property]);
                } catch (e) {
                    //console.log('Error '+property);
                }
            }
        }
    }

    function updateCharts(oPCPFields) {
        // This is where we update the charts
        try {
            oCharts.Head.addDataPoints(oPCPFields.headpitch, oPCPFields.headyaw);
            oCharts.RightShoulder.addDataPoints(oPCPFields.rshoulderpitch, oPCPFields.rshoulderroll);
            oCharts.LeftShoulder.addDataPoints(oPCPFields.lshoulderpitch, oPCPFields.lshoulderroll);
            oCharts.RightElbow.addDataPoints(oPCPFields.relbowyaw, oPCPFields.relbowroll);
            oCharts.LeftElbow.addDataPoints(oPCPFields.lelbowyaw, oPCPFields.lelbowroll);
            oCharts.RightWrist.addDataPoints(oPCPFields.rwristyaw, oPCPFields.rwristroll);
            oCharts.LeftWrist.addDataPoints(oPCPFields.lwristyaw);
            oCharts.RightWrist.addDataPoints(oPCPFields.rwristyaw);
            oCharts.LeftHip.addDataPoints(oPCPFields.lhipyawpitch, oPCPFields.lhiproll, oPCPFields.lhippitch);
            oCharts.RightHip.addDataPoints(oPCPFields.rhipyawpitch, oPCPFields.rhiproll, oPCPFields.rhippitch);
            oCharts.LeftHand.addDataPoints(oPCPFields.lhand);
            oCharts.RightHand.addDataPoints(oPCPFields.rhand);
            oCharts.LeftKnee.addDataPoints(oPCPFields.lkneepitch);
            oCharts.RightKnee.addDataPoints(oPCPFields.rkneepitch);
            oCharts.LeftAnkle.addDataPoints(oPCPFields.lanklepitch, oPCPFields.lankleroll);
            oCharts.RightAnkle.addDataPoints(oPCPFields.ranklepitch, oPCPFields.rankleroll);
            oCharts.LeftFoot.addDataPoints(oPCPFields.leftfoottotalweight);
            oCharts.RightFoot.addDataPoints(oPCPFields.rightfoottotalweight);
        } catch (e) {
            //console.error('Error adding content to chart');
        }
    }
    function _setupWebsocketChannel() {
        // Check if WebSockets are supported
        if (!sap.ui.Device.support.websocket) {
            alert("WebSocket is not supported by your Browser!");
            return;
        }
        const _reader = new FileReader();
        _reader.addEventListener('loadend', (e) => {
            try {
                const jsonData = JSON.parse(e.srcElement.result.toLowerCase());
                updateActuals(jsonData);
                updateCharts(jsonData);
            } catch (ex) {}
        });
        onWebSocketMessage = function (oEvent) {
            //console.time('Msg2');
            // Message from server arrives
            try {
                _reader.readAsText(oEvent.data);
            } catch (e) {}
        };
        onWebSocketClose = function (oEvent) {
            console.warn('Websocket connection closed');
            setTimeout(function () {
                _setupWebsocketChannel();
            }.bind(this), 1000);
        };
        onWebSocketError = function (oEvent) {
            console.error('Websocket error');
        };
        oWebSocket = new WebSocket('ws://localhost:8000');
        oWebSocket.onopen = function (evt) { onWebSocketOpen(evt); };
        oWebSocket.onclose = function (evt) { onWebSocketClose(evt); };
        oWebSocket.onmessage = function (evt) { onWebSocketMessage(evt); };
        oWebSocket.onerror = function (evt) { onWebSocketError(evt); };
    }
    _setupWebsocketChannel();
