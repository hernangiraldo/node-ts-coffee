import express from 'express';
import bodyParser from 'body-parser';

// General configurations
import './config/config';
// DB Configuration
import './config/db';
// Routes
import indexRoutes from './config/routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', indexRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listen on port ${process.env.PORT}`);
})