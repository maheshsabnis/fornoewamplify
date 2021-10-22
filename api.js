const express = require("express");
const cors = require("cors");
const dal = require("./dal/dal");
const port = process.env.PORT || 9011;
const instance = express();

// COnfigure Middlewares
// for reading headers
instance.use(express.urlencoded({ extended: false }));
// parse json
instance.use(express.json());
// configure cors

instance.use(
  cors({
    origin: "*", // all oriogins are allowd OR specify orogins as per your demand
    allowedHeaders: "*", // allow all headers OR specifiy headers
    methods: "*", // allow all method OR specify http methods
  })
);

// instance of DataAccess classes
const dalObject = new dal();

// API method for get request
instance.get("/api/products", (req, resp) => {
  let products = dalObject.getProducts();
  resp.status(200).send({ data: products });
});


// the get request with id
// parameter(s) can be set using :[NAME]
// http://localhost:9081/api/products/Prd-001
instance.get("/api/products/:id", (req, resp) => {
  // read the header id
  let id = req.params.id;
  let product = dalObject.getProductsById(id);
  if (product == null || product === undefined || !product) {
    resp.status(404).send({ message: "Record not found, it may be deleted" });
  } else {
    resp.status(200).send({ data: product });
  }
});

// The Post request
instance.post("/api/products", (req, resp) => {
  // read data from body.
  let product = req.body;
  console.log(`Received data from Body ${JSON.stringify(product)}`);
  let products = dalObject.createProduct(product);
  resp.status(200).send({ data: products });
});

instance.put("/api/products/:id", (req, resp) => {
  // logic
  // read header and search record, if found read data from body and update the array and send response
  // if id is empty or record not found generate errro occrdingly
});

instance.delete("/api/products/:id", (req, resp) => {
  // logic
  // read header and search record,delete record and send response accordingly
  // if id is empty or record not found generate errro occrdingly
});

instance.listen(port, () => {
  console.log(`REST APIs are on port ${port}`);
});
