const express = require("express");
var methodOverride = require("method-override");

const app = express();

const Product = require("./models/products.model");
const resume = require("./controllers/resumecontroller");
// const coverPage = require("./controllers/coverPage");

const passport = require("./configs/passport")

// vikash
const productController = require("./controllers/product.controllers");


app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");

app.use(express.json());

// const {
//   mannualRegister,
//   usersList,
// } = require("./controllers/studentRegister.conteoller");

// riyaz
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);



app.use("/internshala/resume", resume);
// app.use("/coverPage", coverPage);

// riyaz

app.get("/job",(req,res) => {
  return res.render("individualJob");
})

const userController = require("./controllers/user.controller")

app.use(express.static("public"));

// app.post("/internshala/mannual", mannualRegister);
// app.get("/users",usersList)

app.use("/internshala",userController)

app.use("/internshala/products", productController);

// app.get("/internshala/productPage", async (req, res) => {
//   try {
//     return res.render("product", req.user);
//   } catch (err) {
//     res.send("Error");
//   }
// });

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});



// app.get("/internshala/productPage",(req,res)=>{
//   return res.render("productPage",{user:false})
// });


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  async (req, res) => {
    // let data = await Product.find().lean().exec();
    // // console.log("data:", data);
    // dummyData = JSON.stringify(data);
    let user = JSON.stringify(req.user.user);
    return res.render("productPage", { user: user });
  }
);


app.get("/auth/google/failure", (req,res) => {
  return res.send("Failed")
});



module.exports = app;
