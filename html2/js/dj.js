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
            if (newValue !== oldValue) {
                elem.innerHTML = newValue;
                elem.classList.value = _defaultClass + (oldValue <= newValue ? ' actualMore' : ' actualLess');
            } else {
                elem.classList.value = _defaultClass;
            }
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
        const _reader = new FileReader();
        _reader.addEventListener('loadend', (e) => {
            try {
                const oRobotData = JSON.parse(e.srcElement.result.toLowerCase());
                try {
                    if (oRobotData.volume === 0) {
                        for (var property in oRobotData) {
                            if (oRobotData.hasOwnProperty(property)) {
                                oRobotData[property] = 0;
                            }
                        }
                        _setRobotStatus('Idle');
                    } else {
                        _setRobotStatus('Talking');
                    }
                } catch (a) {}
                updateActuals(oRobotData);
                updateCharts(oRobotData);
            } catch (ex) {}
        });
        onWebSocketMessage = function (oEvent) {
            // Message from server arrives
            try {
                _reader.readAsText(oEvent.data);
            } catch (e) {}
        };
        onWebSocketOpen = function (oEvent) {
            console.warn('Websocket connection open');
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
    const ranges = [{ startValue: 0, endValue: 12, style: { fill: '#0066FF', stroke: '#0066FF' } }, { startValue: 12, endValue: 28, style: { fill: '#00FF33', stroke: '#00FF33' } }, { startValue: 28, endValue: 35, style: { fill: '#FFCC00', stroke: '#FFCC00' } }, { startValue: 35, endValue: 40, style: { fill: '#FF0000', stroke: '#FF0000' } }];
    let tempurature = 0;
    let robotStatus = 'Idle';

    function _setRobotStatus(status) {
        switch (status) {
        case 'Idle':
            robotStatus = status;
            break;
        case 'Talking':
            switch (robotStatus) {
            case 'Idle':
                robotStatus = status;
                _tempIncrementer1();
                break;
            default:
            }
            break;
        case 'Dancing':
            break;
        default:
        }
    }

    function setTemp(temp) {
        tempurature = isNaN(temp) ? 0 : temp;
        console.log('Temp='+tempurature);
        if (robotStatus === 'Idle') {
            $('#gauge').jqxLinearGauge({ value: 0 });
        } else {
            if ($('#gauge').jqxLinearGauge('value') !== tempurature) {
                $('#gauge').jqxLinearGauge({ value: tempurature });
            }
        }
    }

    // This incrementer should take us from 15 - 25 degrees in about 3.5 minutes
    function _tempIncrementer1() {
        if (robotStatus !== 'Idle') {
            setTemp(tempurature < 15 ? 15 : tempurature + 0.25);
            if (tempurature < 25) {
                setTimeout(_tempIncrementer1, 4000);
            } else {
                setTimeout(_tempIncrementer2, 4000);
            }
        } else {
            setTemp(0);
        }
    }
    // This incrementer should take us from 25 - 30 degrees in 90 seconds
    function _tempIncrementer2() {
        if (robotStatus !== 'Idle') {
            setTemp(tempurature < 25 ? 25 : tempurature + 0.25);
            if (tempurature < 30) {
                setTimeout(_tempIncrementer2, 4500);
            } else{
                setTimeout(_tempIncrementer3, 4500);                
            }
        } else {
            setTemp(0);
        }
    }
    // This incrementer should take us from 30 - 35 degrees in 40 seconds
    function _tempIncrementer3() {
        if (robotStatus !== 'Idle') {
            setTemp(tempurature < 30 ? 30 : tempurature + 0.25);
            if (tempurature < 40) {
                setTimeout(_tempIncrementer3, 2000);
            }
        } else {
            setTemp(0);
        }
    }

    $(document).ready(function () {
        $('#gauge').jqxLinearGauge({
            orientation: 'vertical',
            width: '100%',
            height: '100%',
            labels: { interval: 5 },
            ticksMajor: { size: '10%', interval: 5, style: { stroke: '#A1A1A1', 'stroke-width': 1 }, visible: true },
            ticksMinor: { size: '10%', interval: 1, style: { stroke: '#A1A1A1', 'stroke-width': 1 }, visible: true },
            max: 40,
            min: 0,
            value: 0,
            pointer: { pointerType: 'arrow', size: '30%', visible: true, offset: 10 },
            colorScheme: 'scheme01',
            background: { visible: false },
            ranges: ranges,
            animationDuration: 100
        });
        setTimeout(function () {
            _setupWebsocketChannel();
        }.bind(this), 1000);
    });
    _setupWebsocketChannel();