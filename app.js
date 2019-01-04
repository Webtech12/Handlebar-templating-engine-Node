
const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

app.engine('handlebars', expressHbs({layouts:'', defaultLayout: 'main-layout'}));
app.set('view engine', 'handlebars');
app.set('views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).render('404', {docTitle:'Page Not Found'});
});

app.listen(3000);
