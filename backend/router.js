const express = require("express");
const router = express.Router();
module.exports = router;
router.get("/product/", async(req, res) => {res.send(req.query);});
router.get("/product/:id", async(req, res) => {res.send("un produit par id : " + `${req.params.id}`);});

router.get("/testimony", async(req, res) => {res.send(req.query);});
router.get("/testimony/:id", async(req, res) => {res.send("un témoignage par id : " + `${req.params.id}`);});
router.post("/testimony", async(req, res) => {});
router.patch("/testimony/:id", async(req, res) => {});
router.delete("/testimony/:id", async(req, res) => {});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: `${req.method + ":" + req.originalUrl} Page not found`,
    });
});

module.exports = router;