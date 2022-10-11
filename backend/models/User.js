const mongoose = require("mongoose");

/* User
username: string türünde zorunlu alan 
unique: Verileri ekleyeceğimiz collectionda aynı id değerinde birden fazla verinin olması durumunu engellemektedir. 
isAdmin default 'u false dur. Genelde kullanıcılar giriş yapıcak
{timestamps:true} , Mongoose şemanıza createdAt özelliği ekler.
*/

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// UserSchema'yı User diye adlandırıp dışarıya aktardık..
module.exports = mongoose.model("User", UserSchema);