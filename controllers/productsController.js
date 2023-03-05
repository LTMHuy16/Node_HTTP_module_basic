const Product = require("../models/productsModels");
const { getPostData } = require("../utilities/utilities");

async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, "Content-Type", "application/json");
        res.end(JSON.stringify(products));
    } catch (error) {
        console.error(error);
    }
}

async function getSingleProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (product) {
            res.writeHead(200, "Content-Type", "application/json");
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, "Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Product not found." }));
        }
    } catch (error) {
        console.error(error);
    }
}

async function createProduct(req, res) {
    try {
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price,
        };

        const newProduct = await Product.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.error(error);
    }
}

async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (product) {
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body);

            const productData = {
                id: product.id,
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
            };

            const updProduct = await Product.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updProduct));
        } else {
            res.writeHead(404, "Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Product not found." }));
        }
    } catch (error) {}
}

async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (product) {
            const removedProduct = await Product.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({
                    product: removedProduct,
                    message: "Remove Successfully",
                })
            );
        } else {
            res.writeHead(404, "Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Product not found." }));
        }
    } catch (error) {}
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
