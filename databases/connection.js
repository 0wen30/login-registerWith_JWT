const mongoose = require("mongoose");

module.exports = async () => {
    
    try {
        const conexion = await mongoose.connect(process.env.URI_MONGO);
        console.log('MongoDB connected!!');
        return conexion;
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }

}