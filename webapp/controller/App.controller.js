sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
        onSubmit: function() {
            // Get the data from the model
            var oModel = this.getView().getModel();
            var oData = oModel.getData();

            // Assuming you have an API endpoint to submit the data to the backend
            var sUrl = "http://localhost:4004/odata/v4/my/Product";
            
            // Perform an AJAX request to submit the data to the backend
            $.ajax({
                url: sUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function(response) {
                    // Handle success response from the backend
                    MessageBox.success("Data submitted successfully.");
                },
                error: function(error) {
                    // Handle error response from the backend
                    MessageBox.error("Error occurred while submitting data.");
                }
            });
        }
    });
});
