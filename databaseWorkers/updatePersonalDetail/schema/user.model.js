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
        recoveryEmail:{
            type:String,
            trim:true,
            lowercase:true,
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
            type:["String"],
            default:null,
        },
        loginDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"LoginDetails",
            required:true,
        },
        dateOfBirth:{
            type: String,
            trim:true,
        },
        bannedInCountry:{
            type:[String],
            default:null,
        }
    },
    {
        timestamps:true,
    }
);

// userSchema.index({ email: 1 });

export const User = mongoose.model("User",userSchema)