const url = process.env.KAZABURGER_API_URL;
const token = process.env.KAZABURGER_API_TOKEN;
const express = require("express");
const router = express.Router();
module.exports = router;

router.get("/product/:id", async(req, res) => {;
    fetch(url + "/product/" + req.params.id, {
    method: 'GET',
    })
    .then(response => {
    if (response.ok) {        
        return response.json().then((data) =>
            {res.json(data);}) 
    }
    else{
        throw new Error('Là = y a un problème :');
    }
    })

});

router.get("/product/", async(req, res) => {
const fetchurl = req.query.family ? url + "/product/?family=" + req.query.family : req.query.title ? url + "/product/?title=" + req.query.title : url + "/product/";
fetch(fetchurl, {
    method: 'GET', 
    })
    .then(response => {
    if (response.ok) {        
        return response.json().then((data) =>
            {res.json(data);})
    }
    else{
        throw new Error('Là = y a un problème :');
    }
    })
});

router.get("/testimony/", async(req, res) => {
    const fetchurl = req.query.product ? url + "/testimony/?product=" + req.query.product : req.query.user ? url + "/testimony/?user=" + req.query.user : url + "/testimony/";
    fetch(fetchurl, {
        method: 'GET', 
        'Authorization': 'Bearer ' + token
        })
        .then(response => {
        if (response.ok) {        
            return response.json().then((data) =>
                {res.json(data);})
        }
        else{
            throw new Error('Là = y a un problème :');
        }
        })
    });

router.get("/testimony/:id", async(req, res) => {;
    fetch(url + "/testimony/" + req.params.id, {
    method: 'GET',
    'Authorization': 'Bearer ' + token
    })
    .then(response => {
    if (response.ok) {        
        return response.json().then((data) =>
            {res.json(data);}) 
    }
    else{
        throw new Error('Là = y a un problème :');
    }
    })

});

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