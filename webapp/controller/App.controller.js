sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"

], function(Controller, MessageBox,JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
        onInit: function() {
            this.refreshTableData(); // Call refreshTableData when the controller is initialized
        },

        onSubmit: function() {
            var that = this;
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            
            if (parseFloat(oData.sellPrice) <= parseFloat(oData.costPrice)) {
                MessageBox.error("Sell price must be greater than cost price.");
                return;
            }
            
            var sUrl = "http://localhost:4004/odata/v4/my/Product";

            this.fetchExistingIds(sUrl).then(function(existingIds) {
                if (existingIds.includes(oData.p_id)) {
                    MessageBox.error("Product with ID " + oData.p_id + " already exists.");
                } else {
                    $.ajax({
                        url: sUrl,
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(oData),
                        success: function(response) {
                            MessageBox.success("Data submitted successfully.");
                            that.clearFormData(); // Clear the form data
                            that.refreshTableData();
                        },
                        error: function(error) {
                            MessageBox.error("Error occurred while submitting data.");
                        }
                    });
                }
            }).catch(function(error) {
                MessageBox.error("Error occurred while fetching existing IDs: " + error);
            });
        },

        fetchExistingIds: function(sUrl) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: sUrl + "?$select=p_id",
                    type: "GET",
                    success: function(response) {
                        if (response && response.value) {
                            var existingIds = response.value.map(function(item) {
                                return item.p_id;
                            });
                            resolve(existingIds);
                        } else {
                            reject("Invalid response format");
                        }
                    },
                    error: function(error) {
                        reject(error);
                    }
                });
            });
        },

        clearFormData: function() {
            var oModel = this.getView().getModel();
            var emptyData = {
                p_id: "",
                name: "",
                costPrice: "",
                sellPrice: ""
            };
            oModel.setData(emptyData);
        },

        refreshTableData: function() {
            var that = this;
            var sUrl = "http://localhost:4004/odata/v4/my/Product";
            $.ajax({
                url: sUrl,
                type: "GET",
                success: function(response) {
                    var oTableModel = new JSONModel(response.value);
                    that.getView().setModel(oTableModel, "tableModel");
                },
                error: function(error) {
                    MessageBox.error("Error occurred while fetching table data.");
                }
            });
        }


    });
});
