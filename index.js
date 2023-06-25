require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index');
const errorHandeler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

//Обработчик ошибок,последний middleware
app.use(errorHandeler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});