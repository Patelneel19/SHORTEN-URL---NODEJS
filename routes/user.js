const express = require("express");
const router = express.Router();
const User = require('../controller/user');
router.post('/use', async (req, res) => {
    
    const { name, pssd } = req.body;
    await User.create({
        name,
        pssd
    });
    return res.render("home");


})
module.exports = router;
