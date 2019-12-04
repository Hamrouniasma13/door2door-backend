const app = require("./app");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`WebSockets: Listening http://localhost:${port}`);
  console.log(`Api: Listening http://localhost:${port}`);
  /* eslint-enable no-console */
});
