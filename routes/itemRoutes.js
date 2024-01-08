const express = require("express");
const router = new express.Router();
const ExpressError = require("../errors");
const items = require("../fakeDb")


router.get("/", (req, res, next) => {
    res.json({items})
});

router.post("/", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("You must enter a valid item name and item price", 400)
        const newItem = {
            name: req.body.name.toLowerCase(),
            price: req.body.price
        }
        items.push(newItem)
        res.status(201).json({ added: newItem })
    } catch (e) {
        next(e)
    }
});

router.get("/:name", (req, res, next) => {
    try{
        const foundItem = items.find(item => item.name === req.params.name.toLowerCase())
        if(foundItem === undefined) throw new ExpressError("Item not found", 404)
        return res.json({ item: foundItem })
    } catch(e) {
        next(e)
    }
});

router.patch("/:name", (req, res, next) => {
    try{
        const foundItem = items.find(item => item.name === req.params.name.toLowerCase())
        if(foundItem === undefined) throw new ExpressError("Item not found", 404)
        foundItem.name = req.body.name.toLowerCase()
        res.json({ item: foundItem })
    } catch(e) {
        next(e)
    }
});

router.delete("/:name", (req, res, next) => {
    try {
        const foundItem = items.findIndex(item => item.name === req.params.name.toLowerCase())
        if(foundItem === -1) throw new ExpressError("Item not found", 404)
        items.splice(foundItem, 1)
    res.json({ message: `${req.params.name.toLowerCase()} has been deleted`})
    } catch(e) {
        next(e)
    }
})

module.exports = router