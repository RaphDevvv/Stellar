import jwt from "jsonwebtoken"

const generateToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, 
        process.env.TOKEN_KEY, 
        { expiresIn: "30d" }); 
    return token;
}


export default generateToken