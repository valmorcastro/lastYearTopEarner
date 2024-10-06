const api = require("../api");

const fetchTransactions = async (req, res) => {
  try {
    const { data = null } = await api.getTransactions();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ e });
  }
};

module.exports = { fetchTransactions };
