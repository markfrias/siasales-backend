module.exports = {
    ensureAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.json({message: "Not authenticated", status: "Unauthorized"});
    }
}