const ItemRepository = require("./item.repository");

const repository = new ItemRepository();

exports.getAll = async (req, res) => {
  res.send(await repository.fetchAll());
};
exports.getById = async (req, res) => {
  const item = await repository.getById(req.params.id);
  item ? res.send(item) : res.status(404).send({ message: "Item not found" });
};

exports.repository = repository;
