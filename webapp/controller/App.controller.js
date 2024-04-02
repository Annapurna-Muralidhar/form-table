


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageBox"
// ], function(Controller, MessageBox) {
//     "use strict";

//     return Controller.extend("sap.ui.demo.db.controller.App", {
//         onSubmit: function() {
//             var that = this; // Store reference to the controller instance
//             var oModel = this.getView().getModel();
//             var oData = oModel.getData();
//             var sUrl = "http://localhost:4004/odata/v4/my/Product";

//             // Fetch existing IDs from the backend
//             this.fetchExistingIds(sUrl).then(function(existingIds) {
//                 // Check if the new ID already exists
//                 if (existingIds.includes(oData.p_id)) {
//                     MessageBox.error("Product with ID " + oData.p_id + " already exists.");
//                 } else {
//                     // If the ID doesn't exist, submit the data to the backend
//                     $.ajax({
//                         url: sUrl,
//                         type: "POST",
//                         contentType: "application/json",
//                         data: JSON.stringify(oData),
//                         success: function(response) {
//                             MessageBox.success("Data submitted successfully.");
//                         },
//                         error: function(error) {
//                             MessageBox.error("Error occurred while submitting data.");
//                         }
//                     });
//                 }
//             }).catch(function(error) {
//                 MessageBox.error("Error occurred while fetching existing IDs: " + error);
//             });
//         },

//         fetchExistingIds: function(sUrl) {
//             // Function to fetch existing IDs from the backend
//             return new Promise(function(resolve, reject) {
//                 // Make an AJAX request to fetch existing IDs
//                 $.ajax({
//                     url: sUrl,
//                     type: "GET",
//                     success: function(response) {
//                         if (response && response.value) {
//                             // Extract existing IDs from the response
//                             var existingIds = response.value.map(function(item) {
//                                 return item.p_id;
//                             });
//                             resolve(existingIds);
//                         } else {
//                             reject("Invalid response format");
//                         }
//                     },
//                     error: function(error) {
//                         reject(error);
//                     }
//                 });
//             });
//         }
        
        
        
//     });
// });











// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageBox"
// ], function(Controller, MessageBox) {
//     "use strict";

//     return Controller.extend("sap.ui.demo.db.controller.App", {
//         onSubmit: function() {
//             var oModel = this.getView().getModel();
//             var oData = oModel.getData();
            
//             // Check if the sell price is less than or equal to the cost price
//             if (parseFloat(oData.sellPrice) <= parseFloat(oData.costPrice)) {
//                 MessageBox.error("Sell price must be greater than cost price.");
//                 return; // Stop further execution
//             }
            
//             var sUrl = "http://localhost:4004/odata/v4/my/Product";

//             this.fetchExistingIds(sUrl).then(function(existingIds) {
//                 if (existingIds.includes(oData.p_id)) {
//                     MessageBox.error("Product with ID " + oData.p_id + " already exists.");
//                 } else {
//                     // Perform an AJAX request to submit the data to the backend
//                     $.ajax({
//                         url: sUrl,
//                         type: "POST",
//                         contentType: "application/json",
//                         data: JSON.stringify(oData),
//                         success: function(response) {
//                             MessageBox.success("Data submitted successfully.");
//                         },
//                         error: function(error) {
//                             MessageBox.error("Error occurred while submitting data.");
//                         }
//                     });
//                 }
//             }).catch(function(error) {
//                 MessageBox.error("Error occurred while fetching existing IDs: " + error);
//             });
//         },

//         fetchExistingIds: function(sUrl) {
//             return new Promise(function(resolve, reject) {
//                 $.ajax({
//                     url: sUrl + "?$select=p_id",
//                     type: "GET",
//                     success: function(response) {
//                         if (response && response.value) {
//                             var existingIds = response.value.map(function(item) {
//                                 return item.p_id;
//                             });
//                             resolve(existingIds);
//                         } else {
//                             reject("Invalid response format");
//                         }
//                     },
//                     error: function(error) {
//                         reject(error);
//                     }
//                 });
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
        }
    });
});
