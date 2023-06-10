const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const todoSchema=require('../schemas/todoSchema');
const Todo=new mongoose.model("Todo",todoSchema);

//Get all the todos
router.get('/',(req,res)=>{
    Todo.find({status:'active'})
    .then((data)=>{
        res.status(200).json({
            message:"These are the active todos",
            result:data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
})

//Get a the todo by id
router.get('/:id',async(req,res)=>{
    try{
        const data=await Todo.findById({_id:req.params.id})
        res.status(200).json({
            message:"This is the required todo",
            result:data
        })
    }catch(err){
        res.status(500).json({
            error:err,
        })
    }
})

//post a todo
router.post('/',async(req,res)=>{
    const newTodo=new Todo(req.body);
    await newTodo.save()
    .then(()=>{
        res.status(200).json({
            message:"Todo was inserted successfully"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
})

//post multiple todos
router.post('/all',async(req,res)=>{
    await Todo.insertMany(req.body)
    .then(()=>{
        res.status(200).json({
            message:"Todos was inserted successfully"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

//update a todo
router.put('/:id',async(req,res)=>{
    await Todo.updateOne({_id:req.params.id},{
        $set:{
            status:'inactive'
        }
    })
    .then(()=>{
        res.status(200).json({
            message:"Updated successfully"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

//delete a todo
router.delete('/:id',async(req,res)=>{
    await Todo.deleteOne({_id:req.params.id})
    .then((data)=>{
        res.status(200).json({
            message:"todo is deleted",
            result:data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
})

module.exports=router;