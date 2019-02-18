const fs = require('fs');
var Async = require('async')
var _ = require('underscore');

const Employee = require('../models/employee.js');
const Helper = require('../Helpers/helper.js');



module.exports = {


    // Creating Employee Profile
    createEmployeeProfile: (req, res) => {
        console.log("Creating Employee Profile APi ");
        if (req.body.name == "" || req.body.salary == "" || req.body.skills == "" || req.body.profilePic == "" || req.body.dob == "")
            return res.send({
                statusCode: 400,
                message: "Bad Request"
            })
        Employee.find({})
            .then(respn => {
              //console.log('Response::',respn);
                Helper.genrateEmployeeId(respn, (callback) => {
                    req.body["empId"] = callback;
                    Helper.fileUpload(req.body.profilePic, (callback) => {
                        req.body.profilePic = callback;
                        Employee.create(req.body)
                            .then(result => {

                                return res.send({
                                    statusCode: 200,
                                    message: "Created Successfully."
                                })
                            })
                            .catch(error => {
                                return res.send({
                                    statusCode: 500,
                                    message: "Server Error"
                                })
                            })
                    })
                })
            })
            .catch(err => {
                return res.send({
                    statusCode: 500,
                    message: "Server Error"
                })
            })
    },

    //Get particular employee profile
    getEmployeeProfile: (req, res) => {
        console.log("Get Employee Profile APi ");
        if (!req.body.empId)
            return res.send({
                statusCode: 400,
                message: "Bad Request"
            })
        Employee.findOne({
                empId: req.body.empId
            })
            .then(result => {
                if (result == null)
                    return res.send({
                        statusCode: 404,
                        message: "Data not found"
                    })
                return res.send({
                    statusCode: 200,
                    message: "fetched Successfully.",
                    data: result
                })
            })
            .catch(error => {
                return res.send({
                    statusCode: 500,
                    message: "Server Error"
                })
            })
    },

    //update employee profile
    updateEmployeeProfile: (req, res) => {
        console.log("Update Employee Profile APi ");
        if (req.body.empId == "")
            return res.send({
                statusCode: 400,
                message: "Bad Request"
            })
        if(req.body.profilePic)
        {
        Helper.fileUpload(req.body.profilePic, (callback) => {
        req.body.profilePic=callback;
        Employee.findOneAndUpdate({
                empId: req.body.empId
            }, req.body)
            .then(result => {
                if (result == null)
                    return res.send({
                        statusCode: 404,
                        message: "Employee Id doesn't exist"
                    })
                return res.send({
                    statusCode: 200,
                    message: "Updated Successfully.",
                })
            })
            .catch(error => {
                return res.send({
                    statusCode: 500,
                    message: "Server Error"
                })
            })
          })
          }
          else {
            Employee.findOneAndUpdate({
                    empId: req.body.empId
                }, req.body)
                .then(result => {
                    if (result == null)
                        return res.send({
                            statusCode: 404,
                            message: "Employee Id doesn't exist"
                        })
                    return res.send({
                        statusCode: 200,
                        message: "Updated Successfully.",
                    })
                })
                .catch(error => {
                    return res.send({
                        statusCode: 500,
                        message: "Server Error"
                    })
                })
          }
    },

    //delete employee profile
    deleteEmployeeProfile: (req, res) => {
        console.log("Delete Employee Profile APi ");
        if (!req.body.empId)
            return res.send({
                statusCode: 400,
                message: "Bad Request"
            })
        Employee.deleteOne({
                empId: req.body.empId
            })
            .then(result => {

                if (result.deletedCount == 0)
                    return res.send({
                        statusCode: 404 ,
                        message: "Employee Id does not found"
                    })
                return res.send({
                    statusCode: 200,
                    message: "Deleted Successfully.",
                })
            })
            .catch(error => {
                return res.send({
                    statusCode: 500,
                    message: "Server Error"
                })
            })
    },

   //getting all employee profile with pagination.
    getAllEmployeeProfile: (req, res) => {
        console.log("Get All Employee Profile APi ");

        Employee.find({})
            .then(result => {
                //console.log(result);
                if (result.length == 0)
                    return res.send({
                        statusCode: 404,
                        statusCode: "Data not found"
                    })
                    //Pagination : Content in each page.

                    if(Number(req.body.pageNo)==0) //Page number Zero can't be possible.
                        return res.send({
                          statusCode:400,
                          message:"Bad Request"
                        })
                    var pageNo=Number(req.body.pageNo);
                    var contentInEachPage=Number(req.body.contentInEachPage);
                    var start=(pageNo-1)*contentInEachPage;
                    var end=pageNo*contentInEachPage-1;
                    var data=result.slice(start, end+1);
                return res.send({
                    statusCode: 200,
                    message: "Data fetched Successfully.",
                    data:data
                })
            })
            .catch(error => {
                return res.send({
                    statusCode: 500,
                    message: "Server Error"
                })
            })
    }




}
