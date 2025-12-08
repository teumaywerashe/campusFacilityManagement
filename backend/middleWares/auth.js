export const authMiddleWare = async(req, res, next) => {
    try {
        // if (req.method === "OPTIONS") return next();
        const token = req.headers.token;

        if (!token) return res.status(401).json({ msg: "No token" });
        next();
    } catch (error) {
        console.log(error);
    }
};