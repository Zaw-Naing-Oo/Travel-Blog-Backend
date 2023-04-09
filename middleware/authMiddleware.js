import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
        try {
        const token = req.headers?.authorization.split(" ")[1]; 
        const tokenLength = token.length < 500;
        let decodeData;
        if(token && tokenLength) {
           decodeData = jwt.verify(token, process.env.SECRET);
           req.userId = decodeData?.result?._id;
        } else {
            const token = req.headers?.authorization.split(" ")[1]; 
           decodeData = jwt.verify(token, process.env.SECRET);
           req.userId = decodeData?.result?._id;
        }

        next();
    } catch (error) {
        console.log(error);
        return;
    }

}

export default verifyToken