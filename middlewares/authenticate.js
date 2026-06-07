import jwt from 'jsonwebtoken'

export default function authenticateUser(req,res,next){
    
        const header = req.header("Authorization")

        if(header != null){
            const token = header.replace("Bearer ","")


        jwt.verify(token,"com97#11@",
            (err,decoded) => {
                
                if(decoded == null){
                    res.status(401).json({Message: "Unauthorized" });
                }else{
                    req.user = decoded
                    next()
                }
            }
        )
        }else{
            next()
        }
    }