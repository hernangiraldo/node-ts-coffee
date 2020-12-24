import mongoose from 'mongoose';

export class DBMongoose {

  public configDB(dbUri: string) {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
      dbUri, { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (err) throw err;
        console.log('DB Online')
      }
    )
  }

}
