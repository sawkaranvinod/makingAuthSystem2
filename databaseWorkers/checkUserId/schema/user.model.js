import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
        name: {
            type: String,
            required:true,
            lowercase:true,
            trim:true,
        },
        hashedPhoneNo:{
            type:String,
        },
        hashKeyVersion:{
            type:Number,
        },
        recoveryEmail:{
            type:String,
            trim:true,
            lowercase:true,
        },
        hashedRecoveryPhoneNo:{
            type:String,
        },
        accountBasedOn:{
            type:String,
        },
        hashedPassword:{
            type:String,
            required:true,
        },
        profilePhotoUrl:{
            type:String,
        },
        byPassKey:{
            type:["String"]
        },
        loginDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"LoginDetails"
        },
        dateOfBirth:{
            type: String,
            trim:true,
            lowercase:true,
        }
    },
    {
        timestamps:true,
    }
);

// userSchema.index({ email: 1 });

export const User = mongoose.model("User",userSchema)