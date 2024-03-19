import path from "path";
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from "@pact-foundation/pact";
import { API } from "./api";
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: "ConsumerService",
  provider: "ProviderService",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
});

describe("API test", () => {
  describe("getting all items", () => {
    test("item exists", async () => {
      // Pact interactions
      await provider.addInteraction({
        states: [{ description: "items exist" }],
        uponReceiving: "get all items",
        withRequest: {
          method: "GET",
          path: "/items",
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: eachLike({
            id: "1",
            commodity: "Book",
            name: "Arsene Lupin, Gentleman Burglar",
          }),
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        // make request to Pact mock server
        const item = await api.getAllItems();

        expect(item).toStrictEqual([
          {
            id: "1",
            name: "Arsene Lupin, Gentleman Burglar",
            commodity: "Book",
          },
        ]);
      });
    });

    test("no items exists", async () => {
      // Pact interactions
      await provider.addInteraction({
        states: [{ description: "no items exist" }],
        uponReceiving: "get all items",
        withRequest: {
          method: "GET",
          path: "/items",
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: [],
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        // make request to Pact mock server
        const item = await api.getAllItems();

        expect(item).toStrictEqual([]);
      });
    });
  });

  describe("getting one item", () => {
    test("id 1 exists", async () => {
      // Pact interactions
      await provider.addInteraction({
        states: [{ description: "item with id 2 exists" }],
        uponReceiving: "get item with ID 2",
        withRequest: {
          method: "GET",
          path: "/item/2",
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: like({
            id: "2",
            commodity: "Anime",
            name: "Demon Slayer",
          }),
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        // make request to Pact mock server
        const item = await api.getItem("2");

        expect(item).toStrictEqual({
          id: "2",
          commodity: "Anime",
          name: "Demon Slayer",
        });
      });
    });

    test("item does not exist", async () => {
      // Pact interactions
      await provider.addInteraction({
        states: [{ description: "item with ID 3 does not exist" }],
        uponReceiving: "get item with ID 3",
        withRequest: {
          method: "GET",
          path: "/item/3",
        },
        willRespondWith: {
          status: 404,
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        // make request to Pact mock server
        await expect(api.getItem("3")).rejects.toThrow(
          "Request failed with status code 404"
        );
      });
    });
  });
});
