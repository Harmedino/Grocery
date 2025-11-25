import mongoose from "mongoose";


const addressSchema  = new mongoose.Schema({
userId:{type:string, required:true},
firstName:{type:string, required:true},
lastName:{type:string, required:true},
email:{type:string, required:true},
street:{type:string, required:true},
city:{type:string, required:true},
state:{type:string, required:true},
country:{type:string, required:true},
zipcode:{type:Number, required:true},
phone:{type:string, required:true},
})

const Address =  mongoose.models.addreess || mongaoose.model('address', addressSchema)

export default Addresss