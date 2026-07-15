process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT ERROR:', err);
});
const app = require('./app');

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});