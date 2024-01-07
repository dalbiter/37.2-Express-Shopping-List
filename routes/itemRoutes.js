const express = require("express");
const router = new express.Router();
const ExpressError = require("../errors");
const items = require("../fakeDb")

router.get("/", (req, res, next) => {
    res.json({items})
})

module.exports = router