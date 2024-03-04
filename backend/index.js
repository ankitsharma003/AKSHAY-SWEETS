const port = 5100;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());
//database connection
mongoose.connect(
  "mongodb+srv://ankitsharma17738:Akshay05.@cluster0.ebjc6ta.mongodb.net/akshay-sweets",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1); // Terminate the application on connection error
});

//api

app.get("/", (req, res) => {
  res.send("express app is runnig");
});
// multer
// image storage multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),
  (req, res) => {
    // Assuming you want to return URLs for each uploaded image
    const imageUrls = [];
    for (const fieldName of ["image", "img1", "img2", "img3", "img4"]) {
      if (req.files[fieldName]) {
        imageUrls.push(
          `https://akshay-sweets-backend-1.onrender.com/images/${req.files[fieldName][0].filename}`
        );
      }
    }
    res.json({
      success: 1,
      image_urls: imageUrls,
    });
  }
);

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img1: {
    type: String,
    required: true,
  },
  img2: {
    type: String,
    required: true,
  },
  img3: {
    type: String,
    required: true,
  },
  img4: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    img1: req.body.img1,
    img2: req.body.img2,
    img3: req.body.img3,
    img4: req.body.img4,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
  });

  console.log(product);

  await product.save();
  console.log("saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});
// deleting product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// fetching all products
app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
  console.log(products);
},[]);

app.listen(port, (error) => {
  if (!error) {
    console.log("runnig at " + port);
  } else {
    console.log("error:" + error);
  }
});

//user schema for user
const users = mongoose.model("user", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating endpoint for registering user
app.post("/signup", async (req, res) => {
  let check = await users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_akshay_sweet");
  res.json({ success: true, token });
});

// creatring endpoint for login
app.post("/login", async (req, res) => {
  let user = await users.findOne({ email: req.body.email });
  if (user) {
    let passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_akshay_sweet");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Worng password" });
    }
  } else {
    res.json({ success: false, error: "wrong Email Id" });
  }
});

//midleware for fetching user
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticat using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_akshay_sweet");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "please authenticat using valid token" });
    }
  }
};

// creating endpoint for addtocard
app.post("/addtocart", fetchuser, async (req, res) => {
  let userdata = await users.findOne({ _id: req.user.id });
  userdata.cartData[req.body.itemId] += 1;
  await users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userdata.cartData }
  );
  res.send("added");
});
// creating endpoint for remove the cart data
app.post("/removecartproduct", fetchuser, async (req, res) => {
  let userdata = await users.findOne({ _id: req.user.id });
  if (userdata.cartData[req.body.itemId] > 0) {
    userdata.cartData[req.body.itemId] -= 1;
    await users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userdata.cartData }
    );
    res.send("removed");
  } else {
    res.status(400).send("Item not found in the cart");
  }
});
//creating endpoin getcartdata
app.post("/getcart", fetchuser, async (req, res) => {
  let userdata = await users.findOne({ _id: req.user.id });
  res.json(userdata.cartData);
});
