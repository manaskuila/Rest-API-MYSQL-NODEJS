const { createUser,getUsers,getUsersByUserId,updateUser,deleteUser,getUserByUserEmail } = require("./user.service.js");
const { genSaltSync,hashSync,compareSync,compare } = require("bcrypt");
const {sign} = require('jsonwebtoken');
module.exports = {

    login:(req, res)=>{
        const body=req.body;

        getUserByUserEmail(body.email,(err,results)=>{

            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            //const salt = genSaltSync(10);
           // body.password = hashSync(body.password,salt);
        const result = compare(body.password,results.password);
        console.log(result);
        if(result){
            results.password=undefined;
            const jsonwebtoken = sign({result:results},process.env.WEBTOKEN_CODE,{
                expiresIn:"1h"
            });
            return res.json({
                success: 1,
                message: "login Successfully..",
                token:jsonwebtoken
            });
        }else
        {
            return res.json({
                success: 0,
                message: "Invalid email or password"
            }); 
        }
        });
    },
    createUser: (req, res)=>{

        const body=req.body;
      //2  let {firstName,lastName,gender,email,number} = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        createUser(body,(err,results)=>{
           // console.log(password);
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
        
    },
    getUsersByUserId:(req, res)=>{
        const id = req.params.id;
        getUsersByUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "No Record found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    updateUser:(req, res)=>{
        const body=req.body;
        //2  let {firstName,lastName,gender,email,number} = req.body;
          const salt = genSaltSync(10);
          body.password = hashSync(body.password,salt);
          
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "No Record found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    getUsers:(req, res)=>{
        
          getUsers((err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "No Record found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    deleteUser:(req, res)=>{
        const id = req.params.id;
        deleteUser(id,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "No Record found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    }
};