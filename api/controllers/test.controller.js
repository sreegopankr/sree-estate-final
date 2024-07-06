import jwt from "jsonwebtoken";

export const shouldBeLoggedIn=(req,res)=>{
    console.log(req.userId)

    res.status(200).json({message: "You are Authenticated"})
}

export const shouldBeAdmin =(req,res)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "Not Authenticated!"});

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).json({message: "Token is Not Valid!"});

        if(!payload.isAdmin) return res.status(403).json({message: "Token is Not Valid!"});
    })

    res.status(200).json({message: "You are Authenticated"})
}