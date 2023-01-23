const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        maxlength:25
    },
    username:{
        type:String,
        required:true,
        unique:true,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    avatar:{
        type:String,
        default:'https://i.ibb.co/s3fyxrz/download.png'
    },
    role:{ type:String, default:'user'},
    gender:{ type:String, default:'male'},
    mobile:{ type:String, default:''},
    address:{ type:String, default:''},
    story:{ 
        type:String, 
        default:'',
        maxlength:200
    },
    website:{type:String, default:''},
    followers:[
        {
            type:mongoose.Types.ObjectId, 
            ref:'user'
        }
    ],
    following:[
        {
            type:mongoose.Types.ObjectId, 
            ref:'user'
        }
    ],
    saved:[{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('user', userSchema);