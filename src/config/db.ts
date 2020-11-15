import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/coffee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;

  console.log('DB Online')
})