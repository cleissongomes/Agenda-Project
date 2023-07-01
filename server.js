require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('I connected to the database.');
    app.emit('ready');
  })
  .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'akasdfj0út23456+54qt23qv  qef qwer qwer qewr asdasdasda a6()',
  resave: false, // não salve a sessão se não for modificado 
  saveUninitialized: false,  // não crie sessão até que algo seja armazenado
  store: MongoStore.create({ 
    mongoUrl: process.env.CONNECTIONSTRING,
    touchAfter: 1000 * 60 * 60 * 24 * 7,  // período de tempo em segundos
  }) 
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('ready', () => {  
app.listen(5000, () => {
    console.log('Acessar http://localhost:5000');
    console.log('Servidor executando na porta 5000');
});
});