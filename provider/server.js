const app = require("express")();
const cors = require("cors");
const routes = require("./item/item.routes");
const port = 3000;

const init = () => {
  app.use(cors());
  app.use(routes);
  return app.listen(port, () =>
    console.log(`Provider API listening on port ${port}...`)
  );
};

init();
