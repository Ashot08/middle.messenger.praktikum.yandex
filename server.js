import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('src/dist'));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
