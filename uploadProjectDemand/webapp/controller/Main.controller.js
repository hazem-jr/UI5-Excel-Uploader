sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("uploadProjectDemand.controller.Main", {

		onInit: function() {
			// set the model 
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
		},

		onUpload: function(e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},

		_import: function(file) {
			var that = this;
			var upData = {};
			if (file && window.FileReader) {
				var fileReader = new FileReader();
				fileReader.onload = function(e) {
					var data = e.target.result;

					// get data from excel sheet
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function(sheetName) {
						upData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Set data to the local model 
					that.localModel.setData({
						items: upData
					});
					that.localModel.refresh(true);
				};
				fileReader.onerror = function(ex) {
					alert(ex);
					//	console.log(ex);
				};
				fileReader.readAsBinaryString(file);
			}
		},
		saveDemands: function() {

			var oModel = new sap.ui.model.json.JSONModel();
			var header = {
				"DataServiceVersion": "2.0",
				"Accept": "application/json",
				"Content-Type": "application/json"
			};
            // create payload
			var data = JSON.stringify({
				"ProjectDemand": "string",
				"ProjectDemandName": "string",
				"ProjectDemandDescription": "string",
				"ProjectDemandCategory": "string",
				"ProjectDemandType": "string",
				"ReferencedObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
				"ProjectDemandStatus": "string",
				"ProjectDemandDateMaintenance": "string",
				"ProjectDemandStartDate": "/Date(1492041600000)/",
				"ProjectDemandEndDate": "/Date(1492041600000)/",
				"ProjectDemandReleasedDateTime": "/Date(1492098664000)/",
				"ProjDmndActualSupplyDate": "/Date(1492041600000)/",
				"ProjectDemandPerUnitAmount": "0",
				"ProjectDemandRequestCurrency": "string",
				"ProjDmndRequestedQuantityUnit": "string",
				"PriceUnitQty": "0",
				"ProjDmndReqNetAmountCurrency": "string",
				"ProjectDemandOverallAmount": "0",
				"ProjectDemandExpectedAmount": "0",
				"ProjDmndRequestedQuantity": "0",
				"Plant": "string",
				"PurchasingGroup": "string",
				"PurchasingOrganization": "string",
				"to_Expense": "",
				"to_Material": "",
				"to_Service": "",
				"to_Work": ""
			});
			
			oModel.loadData("service URL"
			, data, true, "POST", null, false, header);
			

		}

	});
});