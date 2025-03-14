const express = require("express");
const router = express.Router();
module.exports = router;
router.get("/", async(req, res) => {console.log("tous les produits");});
router.get("/:val", async(req, res) => { console.log("un produit par id :val");});
router.use((req, res) => {
res.status(404);
res.json({
error: `${req.method + ":" + req.originalUrl} Page not found`,
});
});
module.exports = router;