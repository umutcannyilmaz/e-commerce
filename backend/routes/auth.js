const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

         //REGISTER
/*
Kullanıcı üye olmaya çalıştığında verileriyle post isteği yapar.
Request yani isteğinin body'sinin içindeki username email ve passwordunu alırız.
save() bir Mongoose belgesindeki bir yöntemdir . 
Yöntem save()eşzamansızdır, bu nedenle yapabileceğiniz bir söz verir await.
https://masteringjs.io/tutorials/mongoose/save
*/
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //encrypt ile şifreledik login de decrypt ile çözücez
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    // burada hatayı iletiyoruz.Şifre hatalı kullanıcı adı uygun değil gibi fakat burada sadece hatayı gönderdik.
    res.status(500).json(err);
  }
});

     //LOGIN
/*  
Kullanıcı login olmaya çalıştığında username, password verileriyle post isteği gerçekleştirir.
findOne() bir Mongoose belgesindeki bir yöntemdir . 
Yöntem findOne()eşzamansızdır, bu nedenle yapabileceğiniz bir söz verir await.

CrytoJS - AES
Gelişmiş Şifreleme Standardı (AES), bir ABD Federal Bilgi İşleme Standardıdır (FIPS). 
15 rakip tasarımın yer aldığı 5 yıllık bir süreçten sonra seçildi.

*/

router.get("/login", (req,res)=>{
  res.send("fgg")
})

router.post('/login', async (req, res) => {
  console.log(req.body)
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
       
        !user && res.status(401).json("Wrong User Name");

        // veritabanından gelen user 'ın parolasını çözümledik.. fakat bunu string ve utf8 çevirmeden inputla 
        // kıyaslayamayız...
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            console.log("geldi", originalPassword)
        const inputPassword = req.body.password;
        
        originalPassword !== inputPassword && 
          res.status(401).json("Wrong Password");

          // jwtwebtoken 
          // _id Objected ID mongodb
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        // accessToken finished
        //yıkım yaparak res.status(200) ile şifre hariç diğer bilgileri göndeririz...
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});
        // nesne others ve accessToken gönderirir ... other dersek tek nesne içine access tokeni de koyarız..

    }catch(err){
      res.status(500).json(err);
    }

});

module.exports = router;