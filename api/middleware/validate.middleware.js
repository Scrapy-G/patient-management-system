module.exports = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        
        if(!error)
            return next();
    
        const message = error.details[0].message;
        res.status(400).send("Error: " + message);
    }
}