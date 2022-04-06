const express = require("express");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;
const allRoutes = require("./controllers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", allRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
