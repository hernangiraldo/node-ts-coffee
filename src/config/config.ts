process.env.PORT = process.env.PORT || '3000';
process.env.URI_DB = process.env.URI_DB || 'mongodb://localhost:27017/coffee';
process.env.TOKEN_EXPIRE = process.env.TOKEN_EXPIRE || (60 * 60 * 24).toString();
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'develop_seed';