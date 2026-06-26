const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./db/db");
app.use("/miniinsta/auth", require("./routes/authroutes"));
app.use("/miniinsta/posts", require("./routes/postroutes"));

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});