import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Routes
import indexRoutes from './config/routes';

class AppExpress {
  public express: Express = express();

  constructor() {
    this.express = express();
    this.configApp();
  }

  private configApp() {
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use('/', indexRoutes);
  }

}

export default AppExpress;