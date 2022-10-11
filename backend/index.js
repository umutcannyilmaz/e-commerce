// ilk express kütüphanesini çağırdık ve express değişkenine atadık..
const express= require("express");



// express değişkeni bir fonks. oldu ve app değişkenine atayarak çalıştırdık..
const app = express();

// mongoose kütp. çağırıp mongoose a atadık.
const mongoose = require("mongoose");

//dotenv env dosyasından veriyi kolaylıkla çekmemizi sağlar. dotenv.config() demek zorundayız.
const dotenv = require("dotenv")
dotenv.config()

// json post hataları için express te eskiden otomatik gelirdi şu an yok
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cors =require("cors")
app.use(cors());
// mongoose.connect diyerek bağlandık.
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB connection succesfull")})
.catch((err)=>{console.log(err)})

/* get ile endpointe gelen isteği yakalıyoruz.Birisi istek yaparsa console.log("birisi istek yaptı") çalıştırılır.
 Fakat her endpointe bunu yapmak yerine router oluşturmak daha mantıklı. Ana endpointten dallara ayırmak
app.get("/api/test", ()=> {
    console.log("birisi çağırdı")
})
backend'de console.log terminalde gözükür...
*/

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cardRoute = require("./routes/card");
const orderRoute = require("./routes/order");

//localhost:5000/api/auth
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cardRoute);
app.use("/api/orders", orderRoute);

app.get("/",(req,res)=>{
  res.send("backend server")
  
})

// backend i buradaki port no da çalıştırıyoruz. localhost:5000
//app.listen(process.env.PORT || 5000, ()=>{})

app.listen(5000, () => {
  console.log("Backend server is running!");
  
});