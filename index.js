const express = require("express");

const { connectToMongoDB } = require("./connect");
const path = require('path');
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const userroute = require("./routes/user")
const mongoose = require("mongoose");

const app = express();
const PORT = 800;
const User = require("./controller/user");
const { render } = require("ejs");



connectToMongoDB("mongodb://127.0.0.1:27017/final").then(() =>
    console.log("Mongodb connected")
);
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userroute);
app.get("/test", async (req, res) => {
    const all = await URL.find({});
    return res.render("home");
})
app.get("/signup", (req, res) => {
    return res.render("signup");
})
// 
app.get("/analytics/:url", async (req, res) => {
    // Extract the URL parameter from the request
    const shortId = req.params.url;

    try {
        // Retrieve analytics data for the specified URL
        const result = await URL.findOne({ shortId });

        // If analytics data is found, send it as a JSON response
        if (result) {
            res.json({
                totalClicks: result.visitHistory.length,
                analytics: result.visitHistory,
            });
        } else {
            // If no analytics data is found for the URL, send a 404 error response
            res.status(404).json({ error: "No analytics data found for the specified URL" });
        }
    } catch (error) {
        // If an error occurs during database query, send a 500 error response
        console.error("Error retrieving analytics data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




app.get("/ana", async (req, res) => {
    const analytics = []; // Retrieve analytics data from your database or any other source
    return res.render("Analytics", { analytics }); // Pass the analytics variable to the EJS template
});


app.get("/:shortId", async (req, res) => {
    const ip = req.ip;
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                    ipAddress: req.ip,
                },
            },
        }
    );

    if (!entry) {
        // Handle case where entry is null (no matching document found)
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});



app.post('/use', async (req, res) => {

    const { name, pssd } = req.body;
    await User.create({
        name,
        pssd
    });
    return res.render("home");


})
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
