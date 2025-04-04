const url = process.env.KAZABURGER_API_URL;
const token = process.env.KAZABURGER_API_TOKEN;
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

let users = [];

//page d'accueil
router.get("/", function(req, res) {
    res.render("index");
});

//page à propos
router.get("/about", function(req, res) {
    res.render("about");
});

router.get("/product/:id", async (req, res) => {
    try {
        const response = await fetch(`${url}/product/${req.params.id}`);
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/product/", async (req, res) => {
    try {
        const params = new URLSearchParams(req.query);
        const response = await fetch(`${url}/product/?${params}`);
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/testimony/", async (req, res) => {
    try {
        const params = new URLSearchParams(req.query);
        const response = await fetch(`${url}/testimony/?${params}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/testimony/:id", async (req, res) => {
    try {
        const response = await fetch(`${url}/testimony/${req.params.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/testimony", async (req, res) => {
    try {
        const response = await fetch(`${url}/testimony/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(req.body)
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch("/testimony/:id", async (req, res) => {
    try {
        const response = await fetch(`${url}/testimony/${req.params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(req.body)
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/testimony/:id", async (req, res) => {
    try {
        const response = await fetch(`${url}/testimony/${req.params.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        res.json({ message: "Témoignage supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/user", (req, res) => {
    const { login, email, id } = req.query;

    if (login) {
        const user = users.find(user => user.login === login);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        return res.json(user);
    }

    if (email) {
        const user = users.find(user => user.email === email);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        return res.json(user);
    }

    if (id) {
        const user = users.find(user => user.id === parseInt(id));
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        return res.json(user);
    }

    res.status(400).json({ error: "Paramètre requis manquant" });
});

router.put("/user", async (req, res) => {
    const { email, login, password } = req.body;

    if (!email || !login || !password) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    if (users.some(user => user.email === email || user.login === login)) {
        return res.status(400).json({ error: "Email ou login déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        email,
        login,
        password: hashedPassword,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

router.patch("/user/:id", async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;

    const user = users.find(user => user.id === parseInt(id));
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    res.json(user);
});

router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));

    if (index === -1) return res.status(404).json({ error: "Utilisateur non trouvé" });

    users.splice(index, 1);
    res.json({ message: "Utilisateur supprimé avec succès" });
});

router.post("/auth", async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: "Login et mot de passe requis" });
    }

    const user = users.find(user => user.login === login);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Mot de passe incorrect" });

    res.json({ message: "Authentification réussie", user });
});

router.use((req, res) => {
    res.status(404).json({
        error: `${req.method} ${req.originalUrl} - Page non trouvée`
    });
});

module.exports = router;