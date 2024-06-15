const {ObjectId}= require('mongodb')
const addAssetSchema = require('../addAsset/addAsset.model')
const QRCode = require("qrcode");


const controller= {
  
    async QrCodeGenration(req,res){  

        const findData=await addAssetSchema.findById({_id:new ObjectId(req.params.id)});
        const data={
            assetName:findData.assetName,
            assetCode:findData.assetCode
        }
        let stringData = JSON.stringify(data);

         // Print the QR code to terminal
        QRCode.toString(stringData, { type: "terminal" }, function (err, QRcode) {
          if (err) return console.log("error occurred");
        // Printing the generated code
          console.log(QRcode);
        });
        
        // Converting the data into base64 ans send 
        QRCode.toDataURL(stringData, function (err,code) {
          if (err) return console.log("error occurred");
          res.send(code);
        });
      }
}
module.exports= controller;