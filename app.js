require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const multer = require('multer');
const upload = multer({ dest: './public/images'});


const staleCookieRemover = require('./middleware/stale-cookie-remover');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar express-session para rastrear a los usuarios logueados
app.use(session({
  key: 'user_sid',
  secret: 'asdasdasd',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
}));

// Borrar "stale" cookies
app.use(staleCookieRemover);

// Conectar router raiz
app.use('/', indexRouter);

// Atrapar todas las rutas que no tienen router y tirar 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, next) => {
  // Configurar locales, solo mandando error en modo desasrrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.locals.path = req.path;

  // Renderizar página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
