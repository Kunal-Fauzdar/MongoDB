const mongoose = require('mongoose');
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
let schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20
    },
    author:String,
    price:{
        type:Number,
        min:[1,"price is too low for selling"],  //Error: Book validation failed: price: price is too low for selling
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        enum:['fictional','non-fictional']          //only values inside array will be considered true
    },
    genre:[String],
});
const Book = mongoose.model('Book',schema);
let book1 = new Book({
    title : 'Marvel Comics',
    author:'Marvel',
    price:-10,
    category:"fictional",
    genre:['comics','superhero','fictional','thriller']
});

//let book1 = new Book({
//     author:'r.swami',
//     price:560
// });                          this will give error as title is required

// let book1 = new Book({
//     title : 'The third door',
//     author:'Bifrost',
//     price:"780"              this wont give error as type : number means the given datatype should be able to 
// });                          cast to number in mongodb server

// Book.findOneAndUpdate({name:'Marvel Comics'},{price:-300},{runValidators:true}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{                   //runValidators:true this will check constraints even while updation
//     console.log(err);
// })
book1.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err.errors.price.properties.message);      //price is too low for selling
});



//err.errors
// {
//     price: ValidatorError: price is too low for selling
//         at validate (C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\schemaType.js:1404:13)
//         at SchemaType.doValidate (C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\schemaType.js:1388:7)
//         at C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\document.js:3096:18
//         at process.processTicksAndRejections (node:internal/process/task_queues:85:11) {
//       properties: {
//         validator: [Function (anonymous)],
//         message: 'price is too low for selling',
//         type: 'min',
//         min: 1,
//         path: 'price',
//         fullPath: undefined,
//         value: -10
//       },
//       kind: 'min',
//       path: 'price',
//       value: -10,
//       reason: undefined,
//       [Symbol(mongoose#validatorError)]: true
//     }
//   }

//err.errors.price
// ValidatorError: price is too low for selling
//     at validate (C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\schemaType.js:1404:13)
//     at SchemaType.doValidate (C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\schemaType.js:1388:7)
//     at C:\Users\Kunal Fauzdar\Downloads\MongoDB\node_modules\mongoose\lib\document.js:3096:18
//     at process.processTicksAndRejections (node:internal/process/task_queues:85:11) {  
//   properties: {
//     validator: [Function (anonymous)],
//     message: 'price is too low for selling',
//     type: 'min',
//     min: 1,
//     path: 'price',
//     fullPath: undefined,
//     value: -10
//   },
//   kind: 'min',
//   path: 'price',
//   value: -10,
//   reason: undefined,
//   [Symbol(mongoose#validatorError)]: true
// }

//err.errors.price.properties
// {
//     validator: [Function (anonymous)],
//     message: 'price is too low for selling',
//     type: 'min',
//     min: 1,
//     path: 'price',
//     fullPath: undefined,
//     value: -10
//   }



