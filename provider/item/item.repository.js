const Item = require("./Item");

class ItemRepository {
  constructor() {
    this.items = new Map([
      ["1", new Item("1", "Book", "Arsene Lupin, Gentleman Burglar")],
      ["2", new Item("2", "Anime", "Demon slayer")],
      ["4", new Item("4", "Beverage", "Coke Zero")],
    ]);
  }

  async fetchAll() {
    return [...this.items.values()];
  }

  async getById(id) {
    return this.items.get(id);
  }
}

module.exports = ItemRepository;
