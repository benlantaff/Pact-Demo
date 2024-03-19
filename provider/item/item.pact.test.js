const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const controller = require("./item.controller");
const Item = require("./Item");

// Setup provider server to verify
const app = require("express")();
app.use(require("./item.routes"));
const server = app.listen("3000");

describe("Pact Verification", () => {
  it("validates the expectations of ItemService", () => {
    const opts = {
      logLevel: "INFO",
      providerBaseUrl: "http://127.0.0.1:3000",
      provider: "ItemService",
      providerVersion: "1.0.0",
      pactUrls: [
        path.resolve(
          __dirname,
          "../../consumer/pacts/ConsumerService-ProviderService.json"
        ),
      ],
      stateHandlers: {
        "Item with ID 1 exists": () => {
          controller.repository.items = new Map([
            ["1", new Item("1", "Book", "Arsene Lupin, Gentleman Burglar")],
          ]);
        },
        "item exist": () => {
          controller.repository.items = new Map([
            ["1", new Item("1", "Book", "Arsene Lupin, Gentleman Burglar")],
            ["2", new Item("2", "Anime", "Demon Slayer")],
          ]);
        },
        "no items exist": () => {
          controller.repository.items = new Map();
        },
        "item with ID 3 does not exist": () => {
          controller.repository.items = new Map();
        },
      },
    };

    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        console.log(output);
      })
      .finally(() => {
        server.close();
      });
  });
});
