sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/ws/SapPcpWebSocket"], function (Controller, SapPcpWebSocket) {
    "use strict";
    return Controller.extend("yelcho.dj18.controller.App", {
        onInit: function () {
            // Check if WebSockets are supported
            if (!sap.ui.Device.support.websocket) {
                sap.m.MessageBox.show("Your SAPUI5 version does not support WebSockets. Use version ...", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: "WebSockets not supported",
                    actions: [sap.m.MessageBox.Action.OK]
                });
                return;
            }
            this._setupWebsocketChannel();
        },
        _setupWebsocketChannel: function () {
            // Establish WebSocket Connection
            this.oWs = new SapPcpWebSocket('/sap/bc/apc/sap/ydemojam_2018', SapPcpWebSocket.SUPPORTED_PROTOCOLS.v10);
            // Register Callbacj Functions on WebSocket Events
            this.oWs.attachOpen(function (oEvent) {
                sap.m.MessageToast.show('Websocket connection opened');
            });
            if (window.location.hostname !== 'localhost') {
                this.oWs.attachClose(function (e) {
                    //sap.m.MessageToast.show('Websocket connection closed');
                    setTimeout(function () {
                        this._setupWebsocketChannel();
                    }.bind(this), 1000);
                }.bind(this));
            }
            this.oWs.attachMessage(function (oEvent) {
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
                var oEntry = JSON.parse(oEvent.getParameter("data"));
                // Format Timestamp
                var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ style: "medium" });
                oEntry.Date = oFormat.format(new Date(oEntry.Date));
                // update model
                var aEntries = oModel.getData().EntryCollection;
                aEntries.unshift(oEntry);
                oModel.refresh(true);
            });
        }
    });
});