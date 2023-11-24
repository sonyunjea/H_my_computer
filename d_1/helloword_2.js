const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/sound/:name', (req, res) => {
    const { name } = req.params;
    if (name === "dog") {
        res.send("Sound: '멍멍'");
    } else {
        // Add more conditions for other sounds
        // ...

        // Default response if no condition is met
        res.status(404).send("Sound not recognized");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
