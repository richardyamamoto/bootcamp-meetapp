module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'meetapp',
  database: 'meetapp-db',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
