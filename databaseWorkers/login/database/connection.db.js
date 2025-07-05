import mongoose from "mongoose";


/**
 * 
 * @param {String} URI This parameter is the connection string of the database which will connect to the database
 */

export async function connectDB(URI) {
    try {
        console.log("connecting to database")
        const connect = await mongoose.connect(URI);
        console.log("database is coonnected sucessfully");
    } catch (error) {
        console.log("error in connecting the database",error)
       process.exit(-1); 
    }
}