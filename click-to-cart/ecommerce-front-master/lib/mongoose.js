import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}




// db.js


// const connectionString = process.env.MONGODB_URI || "mongodb+srv://ecommerce:ecommerce@cluster0.vxnrxca.mongodb.net/";

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error(error);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// export default db;