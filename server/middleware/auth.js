import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token não encontrado",
                error: true,
                success: false,
            });
        }

        const decoded = await jwt.verify(token, process.env.TOKEN_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Token inválido ou expirado",
                error: true,
                success: false,
            });
        }

        // Passando o userId para a próxima função
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export default auth;
