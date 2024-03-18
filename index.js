import app from "./app.js";
import dotenv from "dotenv";
import dataBaseConnection from "./src/config/DataBaseConnect.js";
dotenv.config({ path: './src/config/.env' });
dataBaseConnection();
app.get("/", (req, res) => {
    res.send("<h2> hii, there </h2>");
});
app.listen(process.env.PORT || 8500, () => {
    console.log(`Server is Started with port: ${process.env.PORT || 8500}`);
})