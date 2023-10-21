const express = require('express');
const router = express.Router();
const { shopItemsCollection } = require('../schemas/shopItemsSchema');
const jwt = require('jsonwebtoken');
const { isUserLoggedIn, adminsOnly } = require('./middlewares');
require('dotenv').config();



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
    try {
        let {id} = req.params;

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

router.post("/add-item", async(req,res)=>{
    try {

        let {name, description, price, isInStock} = req.body;
        let {userId} = req.decoded;

        let addedItem = await shopItemsCollection.create({
            name,
            description,
            price,
            isInStock,
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
});


router.patch("/update/:id", async(req, res) =>{
    try {

        //let {id} = req.params;
        let {name, description, price, isInStock} = req.body;
        console.log(req.body)

        const updatedItem = await shopItemsCollection.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            isInStock

        }, {new: true});
        
        res.json({
            isRequestSuccessful: true,
            message: `${name} with ID: ${req.params.id} was updated successfully.`,
            updatedItem
        });
    
    } catch (error) {
        console.log(`Error encountered while updating item ${id}.\nError: ${error}`);
        
    };
});

router.delete("/delete-item/:id", async(req, res)=>{
    let id = req.params.id;
    try {
        let itemDeleted = await shopItemsCollection.findByIdAndDelete(id);

    if(!itemDeleted){
        return res.send(`No item with ID: ${id} was found.`);
    };

    res.status(200).json({
        isRequestSuccessful: true,
        message: `Item with the ID ${id} has been deleted from the shop successfully.`
    });

    } catch (error) {
        console.log(`Error encountered while attempting to delete item with ID: ${id}.\nError: ${error}`);
    }
});

module.exports = router;