const protect = (req, res, next) => {
    console.log("Auth state:", req.oidc.isAuthenticated());
    console.log("User info:", req.oidc.user);
        if (req.oidc.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({ message: "User not authenticated"});
        }
    };
    
module.exports = protect;