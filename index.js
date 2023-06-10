const express=require("express");
const mongoose=require("mongoose");

const todoHandler=require("./routeHandler/todoHandler")

//express app initialization
const app=express();
app.use(express.json());


//database connection with mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todos",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection successful"))
.catch((err)=>console.log(err));


//application routes
app.use('/todo',todoHandler);


//default error handler
function errHandler(err,req,res,next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.listen(3000,()=>{
    console.log("app is listening at port 3000");
});