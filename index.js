const express = require("express");
const fetch = require("node-fetch");
const withQuery = require("with-query").default;
require("dotenv").config();
const app = express();

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
const CRYPTO_BASE_URL =
	"https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCSGD";

app.get("/bitcoin/BTCSGD", async (req, res) => {
	console.log("starting");
	try {
		const response = await fetch(CRYPTO_BASE_URL, {
			headers: { "x-ba-key": `${process.env.CRYPTO_API_KEY}` },
        });
		const data = await response.json();
        if (response.status === 200) {
            res.status(200);
            res.json(data)
        } else throw Error
	} catch (e) {
        console.log(e);
        res.status(response.status)
        res.send('Error in connecting')
	}
});

app.get("/", (req,res) => {
    console.log("Hello")
    res.status(200)
    res.send("app is working fine")
    
})

app.listen(PORT, () => {
	console.log(`App started on ${PORT}`);
});
