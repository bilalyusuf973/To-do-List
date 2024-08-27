const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1: create a new todo item
router.post('/todos', [
    body('name', 'Name cannot be blank').exists(),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5})], fetchuser, async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {     
        const todo = await Todos.create({
            user: req.user.id,
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed,
        });

        res.json({success: true, todo});

    } catch (error) {
        res.status(400).send({success: false, error: 'Internal server error'});
    }
});

//ROUTE 2: fetch all todo items
router.get('/todos', fetchuser, async (req, res)=>{
    try {
        const todos = await Todos.find({user: req.user.id});
        res.json({success: true, todos});

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error!"}); 
    }
});

//ROUTE 3: update an existing todo item
router.put('/todos/:id', [
    body('name', 'Name cannot be blank').exists(),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5})], fetchuser, async (req, res)=>{
    try {
        const { name, description, completed } = req.body;
        const newTodo = {
            name: name, description: description, completed: completed
        };
    
        let todo = await Todos.findById(req.params.id);
        if(!todo){return res.status(404).send("Not Found!")};
    
        if(todo.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!");
        }
    
        await Todos.findByIdAndUpdate(req.params.id, {$set: newTodo}, {new: true});
        res.status(200).json({ success: true, newTodo })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error!"});        
    }
});

//ROUTE 4: deleting an existing todo item
router.delete('/todos/:id', fetchuser, async (req, res)=>{
    try {
        let todo = await Todos.findById(req.params.id);
        if(!todo){return res.status(404).send("Not Found!")};

        if(todo.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!");
        }

        await Todos.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Todo deleted successfully!" })  

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error!"});
    }
});

module.exports = router;