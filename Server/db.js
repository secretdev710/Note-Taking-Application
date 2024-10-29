import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notebox", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongo;
