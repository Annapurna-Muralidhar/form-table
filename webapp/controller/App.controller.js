// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageBox"
// ], function(Controller, MessageBox) {
//     "use strict";

//     return Controller.extend("sap.ui.demo.db.controller.App", {
//         onSubmit: function() {
//             // Get the data from the model
//             var oModel = this.getView().getModel();
//             var oData = oModel.getData();
            
//             // Assuming you have an API endpoint to submit the data to the backend
//             var sUrl = "http://localhost:4004/odata/v4/my/Product";
            
//             // Perform an AJAX request to submit the data to the backend
//             $.ajax({
//                 url: sUrl,
//                 type: "POST",
//                 contentType: "application/json",
//                 data: JSON.stringify(oData),
//                 success: function(response) {
//                     // Handle success response from the backend
//                     MessageBox.success("Data submitted successfully.");
//                 },
//                 error: function(error) {
//                     // Handle error response from the backend
//                     MessageBox.error("Error occurred while submitting data.");
//                 }
//             });
//         }
//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
        onSubmit: function() {
            var that = this; // Store reference to the controller instance
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            var sUrl = "http://localhost:4004/odata/v4/my/Product";

            // Fetch existing IDs from the backend
            this.fetchExistingIds(sUrl).then(function(existingIds) {
                // Check if the new ID already exists
                if (existingIds.includes(oData.p_id)) {
                    MessageBox.error("Product with ID " + oData.p_id + " already exists.");
                } else {
                    // If the ID doesn't exist, submit the data to the backend
                    $.ajax({
                        url: sUrl,
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(oData),
                        success: function(response) {
                            MessageBox.success("Data submitted successfully.");
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
            // Function to fetch existing IDs from the backend
            return new Promise(function(resolve, reject) {
                // Make an AJAX request to fetch existing IDs
                $.ajax({
                    url: sUrl,
                    type: "GET",
                    success: function(response) {
                        if (response && response.value) {
                            // Extract existing IDs from the response
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
        }
        
        
        
    });
});
