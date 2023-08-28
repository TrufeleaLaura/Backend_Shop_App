import mongoose from "mongoose";
/**
 * Connect App to MongoDB
 */
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Shop');
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
};
export default connectDB;
//# sourceMappingURL=DBConnection.js.map