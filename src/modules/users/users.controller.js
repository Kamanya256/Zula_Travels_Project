const service = require('./users.service');

exports.registerUser = async (req, res) => {
  try {
    const result = await service.registerUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await service.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};