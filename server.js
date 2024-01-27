//server.js
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const travelRoutes = require('./routes/travelRoutes');
const staticRoutes = require('./routes/static'); // Corrected the require statement
const tourHistoryRoutes = require('./routes/tourHistoryRoutes'); // Add this line
app.use('/tourHistory', tourHistoryRoutes); // Add this line


app.use('/travel', travelRoutes);
app.use('/', staticRoutes);

app.use(bodyParser.json());

// Считать данные из файла tours.json
let tourHistory = require('./tours.json');

app.post('/travelagency', (req, res) => {
    const { city, country, description } = req.body;

    // Assuming you have some logic to add the tour to the database or tourHistory array
    // For simplicity, let's just push the new tour into the tourHistory array
    tourHistory.push({
        city,
        country,
        description,
        // Add other properties as needed
    });

    const newTour = {
        city,
        country,
        description,
        // Add other properties as needed
    };

    res.json({ message: 'Tour added successfully', newTour });
});


// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
