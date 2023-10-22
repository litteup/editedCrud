<<<<<<< HEAD
// const mongoose = require("mongoose");
=======

>>>>>>> eeb454b (upload after making first correction)
const {shopItemsCollection} = require("../schema/shopItemsSchema")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
<<<<<<< HEAD
const {isUserLoggedIn, onlyAdmin} = require("./middlewares")

router.use(isUserLoggedIn);

router.get("/", async (req, res) => {
    const fetchData = await shopItemsCollection.find();
    res.json(fetchData);
});


router.get("/get-single-item/:id", async (req, res) => {
    const aShopItem = await shopItemsCollection.findById(req.params.id);
    if (!aShopItem) return res.status(404).send("User not found");
    res.send(aShopItem);
})


router.use(onlyAdmin);

router.post("/add", async (req, res) => {
    const {name, description, price, isInStock } = req.body;

    try {
        const addedItem = await shopItemsCollection.create({
=======
const {isUserLoggedIn, adminsOnly} = require("./middlewares")


router.use(isUserLoggedIn);

router.get("/", async(req,res) =>{
    try {
        let items = await shopItemsCollection.find();

        if (items.length < 1){
            return res.status(200).send("No item in the shop.");
    }
        res.json({
            isRequestSuccessful: true,
            itemsInStock: `Total number of items in stock: ${items.length}.`,
            items
        });
    } catch (error) {
        console.log(`Error encountered while getting items in the shop.\nError:${error}.`)
        
    }
});



router.get("/:id", async(req, res)=>{

    let = {id} = req.params;

    try {

        let item = await shopItemsCollection.findById(id);
        
        if (!item){
            return res.send(`No item found for item ${id}.`)
        }
        res.status(200).json({
            isRequestSuccessful: true,
            item
        });
    } catch (error) {
        console.log(`Error encountered while trying to get item with the id ${id}.\nError:${error}`);
    }
});



router.use(adminsOnly);

router.post("/", async(req,res)=>{
    try {

        let {name, description, price, isInStock} = req.body;
        let {userId} = req.decoded;

        let addedItem = await shopItemsCollection.create({
>>>>>>> eeb454b (upload after making first correction)
            name,
            description,
            price,
            isInStock,
<<<<<<< HEAD
            user: req.decoded.userId
        })
        res.json({
            isRequestSuccessful: true,
            message: "Item added successfully",
            addedItem
        })
    } catch (error) {
        console.log(`Error encountered.\nError: ${error}`);
    }
    
=======
            user: userId
        });
        res.status(200).json({
            isRequestSuccessful: true,
            message: "Item added succesfully.",
            addedItem
        });
    } catch (error) {
        console.log(`Error encountered while trying to add an item to shop.\nError:${error}`);
        
    }
>>>>>>> eeb454b (upload after making first correction)
});

router.patch("/update/:id", async (req, res) => {
   const {name, description, price, isInstock} = req.body;
<<<<<<< HEAD
    const updatedItem = await shopItemsCollection.findByIdAndUpdate(req.params.id, {
=======
   const {id} = req.params;

    const updatedItem = await shopItemsCollection.findByIdAndUpdate(id, {
>>>>>>> eeb454b (upload after making first correction)
            name,
            description, 
            price, 
            isInstock
    }, {new: true})
    res.json({
        isRequestSuccessful: true,
        "message": "Item updated successfully",
        updatedItem
    });
});


<<<<<<< HEAD
router.delete("/delete-item-by-id:id", async (req, res) => {
    // const {id} = req.params;
    try {
        const itemDeleted = await shopItemsCollection.findByIdAndDelete(req.params.id);
=======
router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const itemDeleted = await shopItemsCollection.findByIdAndDelete(id);
>>>>>>> eeb454b (upload after making first correction)
        if (!itemDeleted) {
            return res.status(404).json({message: "Item-not-found"});
        }
        res.send(`${itemDeleted} has been successfully deleted`);

    } catch (error) {
        console.log(`Error encountered.\nError: ${error}`);
        return res.sendStatus(400);
    }
});

module.exports = router;