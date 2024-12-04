const { decrypt } = require('../utils/encryption');

const decryptMiddleware = (req, res, next) => {
  try {
    if (req.body) {
      console.log(req.body)
      const decryptedData = decrypt(JSON.stringify(req.body));
      req.body = JSON.parse(decryptedData);
    }
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid encrypted request' });
  }
};

module.exports = decryptMiddleware;
