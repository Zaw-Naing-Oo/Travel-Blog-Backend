import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    // console.log(req.headers);
        try {
        const token = req.headers?.authorization.split(" ")[1]; 
        const tokenLength = token.length < 500;
        let decodeData;
        if(token && tokenLength) {
           decodeData = jwt.verify(token, process.env.SECRET);
        //    console.log("normal login",decodeData?.result);
           req.userId = decodeData?.result?._id;
        } else {
            const token = req.headers?.authorization.split(" ")[1]; 
           decodeData = jwt.verify(token, process.env.SECRET);
        //    console.log("google login",decodeData);
           req.userId = decodeData?.result?._id;
        }

        next();
    } catch (error) {
        console.log(error);
        return;
    }

}

export default verifyToken