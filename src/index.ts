import AppExpress from './AppExpress.class';
import { DBMongoose } from './DBMongoose.class';
import './config/config';

class Server {

  public startServer(port: number) {
    const expressApp = new AppExpress();

    expressApp.express.listen(port, () => {
      console.log(`listen on port ${port}`);
    });
  }

  public startDB(dbUri: string) {
    const db = new DBMongoose();
    db.configDB(dbUri);
  }

}

const server = new Server();
server.startServer(Number(process.env.PORT));
server.startDB(String(process.env.URI_DB));
