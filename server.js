const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 1823;

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/main")(app);
app.use(express.static('public'));

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));
