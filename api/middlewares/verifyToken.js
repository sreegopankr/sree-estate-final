import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "Not Authenticated!"});

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).json({message: "Token is Not Valid!"});
        req.userId = payload.id;
        next();
    })
}