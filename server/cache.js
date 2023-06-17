const redis = require("redis");
const client = redis.createClient();

const cache = (req, res, next) => {
  const key = req.originalUrl;
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, 60, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = cache;
