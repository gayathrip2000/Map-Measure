require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const middleware = require('./middleware/middleware');
const app = express();

const dbconfig = require('./db');
const userRoute = require('./routes/usersRoute.js');
const mailRoute = require('./routes/mailRoute.js');
const contactRoute = require('./routes/contactRoute.js');
const MapTemplateRoute = require('./routes/MapTemplateRoute.js');


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/api/auth/*', middleware);
app.use('/api/users', userRoute);
app.use('/api/mail', mailRoute);
app.use('/api/contact', contactRoute); 

app.use('/api/auth/mapTemplate', MapTemplateRoute);


// Add this route to show the server is running
app.get('/', (req, res) => {
  res.send('<html><body><h1>FieldMaster Server Running Here</h1></body></html>');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
