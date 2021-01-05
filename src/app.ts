import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import parseUploadedFile from './middlewares/parseUploadedFile'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import documentsRouter from './routes/documents'
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', parseUploadedFile, documentsRouter)

// catch 404 and forward to error handler
app.use((req:any, res:any, next:any) => {
  next(createError(404))
});

// error handler
app.use((err:any, req:any, res:any, next:any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app