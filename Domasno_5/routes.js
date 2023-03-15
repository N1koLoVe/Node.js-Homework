import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Online Shop</h1>");
});

router.post("/create", (req, res) => {
  console.log("Create product route");

  const body = req.body;
  console.log(body);

  let product = {
    id: uuidv4(),
    name: body.name,
    price: body.price,
    rating: body.rating,
    description: body.description,
    category: body.category,
    isInStock: body.isInStock,
  };

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  products.push(product);

  fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));

  res.status(201).send({ message: "Product was added in database." });
});

router.get("/products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  res.send(JSON.stringify(products, null, 2));
});

router.delete("/delete_product/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product was deleted from the database." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

router.delete("/delete_products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  if (products.length != 0) {
    res.send({ message: "All products deleted." });
    products.length = 0;
  } else {
    res.status(404).send({ message: "No products found to delete." });
  }
  fs.writeFileSync("./products.json", JSON.stringify(products));
});

router.get("/product/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const id = req.params.id;

  const foundId = products.find((product) => product.id === id);

  if (foundId) {
    res.send(JSON.stringify(foundId));
    console.log("Product with id:", id, "was found.");
  } else {
    res.status(404).send({ message: "Product not found." });
    console.log(`Product with id: "${id}" not found.`);
  }
});

router.put("/out_of_stock/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const id = req.params.id;
  const foundProduct = products.findIndex((product) => product.id === id);
  if (foundProduct !== -1) {
    products[foundProduct].isInStock = false;
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
    res.status(200).send({ message: "Product is now out of stock." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

router.put("/edit_product/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id, body);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...body };

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product was updated successfully." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

router.post("/add_to_cart/:id", (req, res) => {
  const id = req.params.id;

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  const cart = JSON.parse(
    fs.readFileSync("./addCart.json", { encoding: "utf-8" })
  );

  cart.push(product);
  fs.writeFileSync("./addCart.json", JSON.stringify(cart));

  res.status(201).send({ message: "Product was added to cart." });
});

router.get("*", (req, res) => {
  res.redirect("/");
});

export default router;
