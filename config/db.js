const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongo data base ${mongoose.connection.host} successfully`.bgGreen.white)
        
    } catch (error) {
        console.log(`Mongodb Database Error ${error}`.bgRed.white);
    }
}

module.exports = connectDB