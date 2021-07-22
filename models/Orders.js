const mongoose= require("mongoose");

const OrderSchema= new mongoose.Schema({
    name:{
        type:"String", required: true
    },
    citizenid:{
        type:"String", required: true
    },
    email:{
        type:"String", required: true 
    }, 
    address:{
        type: "String", required: true
    },
    phone:{
        type:"String", required: true
    },
    orders:{
        type:Object, required: true
    },
    date:{
        type:Date, default:Date.now
    }

});

module.exports=mongoose.model("Orders", OrderSchema);



