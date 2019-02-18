var async = require('async');
var cloudinary = require('cloudinary');
var base64Img = require('base64-img');
const base64 = require('base64topdf');
var fs = require('fs');


cloudinary.config({
    cloud_name: "dki8mtnah",
    api_key: "198791337598694",
    api_secret: "TieGxyKuvmwVNkxwJ1Y_vLxvMLw"
});


//uploading file in cloudinary
var fileUpload = function(data, callback) {
    var filepath = base64Img.imgSync(data, './profile_images/');
    cloudinary.uploader.upload(filepath, function(result) {
        if (result) {
            callback(result.url);
        }
    })
}


//Generating employee id
var genrateEmployeeId = function(data, callback) {

    if(data.length==0)
    callback("ZET000");
    else
    {
      //console.log("Employe id:",data[data.length-1].empId,"empid:",Number(data[data.length-1].empId.slice(5))+1);
      var indx=Number(data[data.length-1].empId.slice(5))+1;
      console.log('indx:::',indx);
      callback("ZET00" +indx );
    }

}


exports.fileUpload = fileUpload;
exports.genrateEmployeeId = genrateEmployeeId;
