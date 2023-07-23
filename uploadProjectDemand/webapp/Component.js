sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"uploadProjectDemand/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("uploadProjectDemand.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */

		init: function() {
			
			// Load external libraries for xlsx file
			var script = document.createElement('script');
			script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
			document.head.appendChild(script);

			var script = document.createElement('script');
			script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
			document.head.appendChild(script);
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

		}
	});
});