const axios = require('axios');

function aPost(data) {
  axios.post('http://localhost:5000/api/items', data)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
}

module.exports = aPost;
