const mongoose = require('mongoose');
main()
.then(()=>{
    console.log('connected');
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    age:Number,
});
const User = mongoose.model('User',userSchema) ;
// const user1 = new User({
//     name:'kunal',
//     email:'kunal4@gmail.com',
//     age:19
// });
// user1.save().then(res=>{console.log('data added')}).catch(err=>{console.log(err)});

// User.insertMany(
//     [{name:'Adam',email:'adamapple12@gmail.com',age:23},
//         {name:'eve',email:'eveslut9@gmail.com',age:19},
//         {name:'god',email:'god7@gmail.com',age:1000}
//     ]
// ).then((res)=>{console.log(res)}).catch(err=>{console.log(err)});

// User.find({age:{$lte:20}}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

//Using findOne()

// User.find({age:{$lte:20}}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

//using findById()

// User.findById("681cbf5e6f2b05c4386dba83").then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

//there is updateOne() too
//using updateMany

// User.updateMany({ age : {$lte:19}},{age:24}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

// User.findOneAndUpdate({name:'kunal'},{age:20},{new:true}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });                                 //prints updated value or values



// User.findByIdAndUpdate("681cc299830a0152aa2f45d1",{age:26},{new:true}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// }); 

//there is deleteMany() too
//using deleteOne

// User.deleteOne({age:24}).then(res=>{
//         console.log(res);
//     }).catch(err=>{
//         console.log(err);
//     }); 


//using findOneAndDelete

User.findOneAndDelete({name:'Adam'}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        }); 

//prints deleted user
// {
//     _id: new ObjectId('681cc299830a0152aa2f45d1'),
//     name: 'Adam',
//     email: 'adamapple12@gmail.com',
//     age: 26,
//     __v: 0
//   }