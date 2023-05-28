const bcrypt = require("bcrypt");

const { User } = require("../models/user.model");

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user)
        return res.status(401).send("Error: Invalid email/password");

    const passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValid)
        return res.status(401).send("Error: Invalid email/password");
    
    const token = user.generateAuthToken();
    res.send({ token });
}