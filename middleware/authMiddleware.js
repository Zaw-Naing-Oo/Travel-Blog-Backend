import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    // console.log(req.headers?.authorization.split(" ")[1]);
    try {
        const token = req.headers?.authorization.split(" ")[1]; 
        const tokenLength = token.length < 500;
        let decodeData;
        if(token && tokenLength) {
           decodeData = jwt.verify(token, process.env.SECRET);
        //    console.log(decodeData);
           req.userId = decodeData?._id;
        }

        next();
    } catch (error) {
        console.log(error);
        return;
    }

}

export default verifyToken