const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js'); 
const methodOverride = require('method-override');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
const ExpressError = require('./ExpressError.js')

main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log('error : '+err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

// const chat1 = new Chat({
//     from:'priya',
//     to:'neha',
//     message:'send me exam sheets',
//     created_at: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get('/chats', async (req,res,next)=>{
    try{
        let chats = await Chat.find();
        res.render("home",{chats});
    }catch(err){
        next(err);
    }
    
});


app.get('/chats/new',(req,res)=>{
    res.render("new.ejs");
});

app.get('/chats/:id',async(req,res,next)=>{
    try{
            let {id} = req.params;
        let chat =await Chat.findById(id);
        console.log(chat)
        if(!chat){
            next(new ExpressError(404,"Chat not Found"));
        }
        res.render('edit.ejs',{chat});
    }catch(err){
        next(err);  
    }
    
});

app.post('/chats/upload',async(req,res,next)=>{
    try{
        let {sender,message,reciever}=req.body;
        let newChat = new Chat({
            from : sender,
            message : message ,
            to : reciever,
            created_at:new Date()
        });
        await newChat.save();
    }catch(err){
        next(err);
    }

})
app.get('/chats/:id/edit',async(req,res,next)=>{
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        console.log(chat);
        res.render('edit.ejs',{chat});
    }catch(err){
        next(err);
    }
     
});
app.put('/chats/:id',async(req,res,next)=>{
    try{
        let {id} = req.params;
        let {message} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id,{message:message},{runValidators:true,new:true});
        console.log(updatedChat);
        res.redirect('/chats');
    }catch(err){
        next(err);
    }
    
});
app.delete("/chats/:id",async (req,res,next)=>{
    try{
        let {id} = req.params;
        let deletedchat = await Chat.findByIdAndDelete(id);
        console.log(deletedchat);
        res.redirect("/chats");
    }catch(err){
        next(err);
    }  
    
});

app.use((err,req,res,next)=>{
    let {status=500,message}= err;
    res.status(status).send(message);
});
app.listen(5050,()=>{
    console.log('server is listening');
});
