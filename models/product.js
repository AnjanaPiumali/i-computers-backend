import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type     : String,
        unique   : true,
        required : true
    },
    name : {
        type     : String,
        required : true
    },
    alteNames : {
        type   : [String],
        default : []
    },
    description : {
        type     : String,
        required : true
    },
    image : {
        type     : String,
        required : true
    },
    price : {
        type     : String,
        required : true
    },
    price : {
        type     : Number,
        required : true
    },
    labelledPrice : {
        type     : Number,
        default  : 0
    },
    stock : {
        type    : Number,
        default : 0
    },
    isAvailable : {
        type    : Boolean,
        default : true
    },
    category : {
        type     : String
    },

    brand : {
        type : String
    },
    model : {
        type : String
    },

})

const Product = mongoose.model('Product' , productSchema)

export default Product;