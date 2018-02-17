sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/ws/SapPcpWebSocket", "sap/ui/model/json/JSONModel", "sap/ui/core/format/DateFormat"], function (Controller, SapPcpWebSocket, JSONModel, DateFormat) {
    "use strict";
    return Controller.extend("yelcho.dj18.controller.App", {
        onInit: function () {
            // Set WS Model
            var oModel = new JSONModel({ "StatusIcon": 'sap-icon://question-mark' });
            this.getView().setModel(oModel, 'ws');
            this._setupWebsocketChannel();
        },
        _isConnected: function (bConnected) {
            this.getView().getModel('ws').setProperty('/StatusIcon', bConnected ? 'sap-icon://connected' : 'sap-icon://disconnected');
        },
        _setupWebsocketChannel: function () {
            // Check if WebSockets are supported
            if (!sap.ui.Device.support.websocket) {
                sap.m.MessageBox.show("Your SAPUI5 version does not support WebSockets. Use version ...", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: "WebSockets not supported",
                    actions: [sap.m.MessageBox.Action.OK]
                });
                return;
            }
            // Establish WebSocket Connection
            this.oWs = new SapPcpWebSocket('/sap/bc/apc/sap/ydj2018', SapPcpWebSocket.SUPPORTED_PROTOCOLS.v10);
            // Register Callbacj Functions on WebSocket Events
            this.oWs.attachOpen(function (oEvent) {
                sap.m.MessageToast.show('Websocket connection opened!');
                this._isConnected(true);
            }.bind(this));
            if (window.location.hostname !== 'localhost') {
                this.oWs.attachClose(function (e) {
                    this._isConnected(false);
                    sap.m.MessageToast.show('Websocket connection closed');
                    setTimeout(function () {
                        this._setupWebsocketChannel();
                    }.bind(this), 1000);
                }.bind(this));
            }
            this.oWs.attachMessage(function (oEvent) {
                console.dir(oEvent);
                // Message from server arrives
                if (oEvent.getParameter("pcpFields").errorText) {
                    // Message is an error message
                    sap.m.MessageBox.show(oEvent.getParameter("pcpFields").errorText, {
                        icon: sap.m.MessageBox.Icon.ERROR,
                        title: 'Error',
                        actions: [sap.m.MessageBox.Action.OK]
                    });
                    return;
                }
                // Parse Message
                var oPCPFields = oEvent.getParameter('pcpFields');
                var sMsg = oEvent.getParameter("data");
                // Format Timestamp
                //var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ style: "medium" });
                //oEntry.date = oFormat.format(new Date(oEntry.date));
                // update model
                oPCPFields.Message = sMsg;
                var aEntries = oModel.getData().EntryCollection;
                aEntries.unshift(oPCPFields);
                oModel.refresh(true);
                console.dir(oModel.getData().EntryCollection);
            }.bind(this));
            this.oWs.attachClose(function (oEvent) {
                this._isConnected(false);
                sap.m.MessageToast.show('Websocket connection closed');
                // setTimeout(function () {
                //     this._setupWebsocketChannel();
                // }.bind(this), 1000);
            }.bind(this));
            this.oWs.attachError(function (oEvent) {
                this.getView().getModel('ws').setProperty('/StatusIcon', 'sap-icon://error');
            }.bind(this));
            // Set UI Model
            var oModel = new JSONModel({ "EntryCollection": [] });
            this.getView().setModel(oModel);
        },
        onTest: function (oEvent) {
            var oPayload = {
                "now": "2018-02-17T13:55:39.038694",
                "RWristYaw": -0.06907200813293457,
                "HeadYaw": 0.11347413063049316,
                "RHipPitch": -0.7041480541229248,
                "RElbowYaw": 1.010864019393921,
                "RShoulderPitch": 1.458876132965088,
                "LShoulderRoll": 0.1257460117340088,
                "LKneePitch": 2.1506261825561523,
                "RAnkleRoll": -0.09199810028076172,
                "LShoulderPitch": 1.5094140768051147,
                "LHipPitch": -0.6917920112609863,
                "LElbowYaw": -0.8360719680786133,
                "LAnklePitch": -1.20269775390625,
                "LeftFoot": 1.835675835609436,
                "RHipYawPitch": 0.0,
                "HeadPitch": 0.059783935546875,
                "LElbowRoll": -1.1673320531845093,
                "RightFoot": 1.138586401939392,
                "RShoulderRoll": -0.2454819679260254,
                "LAnkleRoll": 0.07213997840881348,
                "LHipYawPitch": -0.29141807556152344,
                "RAnklePitch": -1.2087500095367432,
                "LHipRoll": -0.07665801048278809,
                "RHipRoll": 0.09975194931030273,
                "RElbowRoll": 0.8544800281524658,
                "RKneePitch": 2.159914016723633
            };
            $.ajax({
                type: "POST",
                url: '/sap/dj2018',
                data: oPayload,
                success: this._postSuccess.bind(this),
                error: this._postError.bind(this)
            });
        },
        _postSuccess: function (data, textStatus, jqXHR) {
            console.log('Successful POST');
        },
        _postError: function (jqXHR, textStatus, errorThrown) {
            MessageToast.show('POST error ', textStatus);
        },
        onPost: function (oEvent) {
            this.oWs.send(oEvent.getParameter('value'), {
                'Sender': 'Graham'
            });
        }
    });
});