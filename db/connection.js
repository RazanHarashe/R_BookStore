import mongoose from 'mongoose';
const connectDB = async () => {
  return await mongoose.connect(process.env.DB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(`error to connect MongoDB ${err}`);
    });
};
export default connectDB;
