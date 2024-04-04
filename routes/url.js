const express = require("express");
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
} = require("../controller/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/ana/:shortId",async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
});

module.exports = router;
