import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {

  const conn = await mongoose.connect( process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected to: ${conn.connection.host }`.cyan.underline.bold);
  return '';
}

export default connectDB;