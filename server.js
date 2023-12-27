import express from 'express';
import path from 'node:path';


const app = express();
const PORT = 3000;

app.use(express.static('src/dist'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve('./src/dist/index.html'));
});
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
