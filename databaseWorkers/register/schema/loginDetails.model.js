import mongoose from "mongoose";


const loginDetailSchema = new mongoose.Schema(
    {
        ipAddress:{
            type:String,
            required:true,
        },
        devicehash:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);


export const LoginDetails = mongoose.model("LoginDetail",loginDetailSchema);

