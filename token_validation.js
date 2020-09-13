const { verify, decode,next } = require("jsonwebtoken");


module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");
        if(token)
        {
            token = token.slice(7);
            verify(token,process.env.WEBTOKEN_CODE,(err,decode)=>{
                if(err){
                   return res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                    
                } else {
                   return next();
                }
            });

        }
        else
        {
           return res.json({
                success: 0,
                message: "Access denied unauthorized user"
            });
        }
    }
}