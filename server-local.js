const app = require('./functions/api');

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is up and running at ' + (process.env.PORT || 4000));
});
