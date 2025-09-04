import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    // get token
    // check if token is valid
    // get the data from token
    try {
        console.log(req.cookies);
        const token = req.cookies?.token

        console.log('Token found ', token ? "yes" : "No");

        if (!token) {
            console.log("Token not found");
            return res.status(401).json({
                message: "Unauthorized User",
                success: false,
            });
        }

        const data = jwt.verify(token, process.env.jwt_secret)
        console.log(data);


    } catch (error) {

    }


    next()
}
