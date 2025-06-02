const mongoose = require('mongoose');
const Chat = require('./models/chat.js'); 
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log('error : '+err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};
let chats = [
    {
        from:'kunal',
        to:'akash',
        message:'send mom of previous meeting',
        created_at:new Date()
    },
    {
        from:'kunal',
        to:'mohak',
        message:'send datasheet of shares',
        created_at:new Date()
    },
    {
        from:'kunal',
        to:'mohit',
        message:'send report of previous project',
        created_at:new Date()
    },
    {
        from:'kunal',
        to:'darshan',
        message:'send progress report',
        created_at:new Date()
    },
    {
        from:'kunal',
        to:'sarveksh',
        message:'send graph of boom in usage',
        created_at:new Date()
    }

]
Chat.insertMany(chats);