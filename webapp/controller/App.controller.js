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
        onPost: function (oEvent) {
            this.oWs.send(oEvent.getParameter('value'),{
                'Sender': 'Graham'
            });
        }
    });
});