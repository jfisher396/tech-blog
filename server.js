const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
const allRoutes = require('./controllers');

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', allRoutes);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {console.log(`App listening on PORT ${PORT}`)})
})