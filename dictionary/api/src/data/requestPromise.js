const request = require('request');

const requestPromise = url => {
  return new Promise((resolve, reject) => {
    return request.get(url).on('response', response => {
      let content = '';
      response.on('data', chunk => (content += chunk));
      response.on('end', _ => resolve(content));
      response.on('error', reject);
    });
  });
};

module.exports  = {
  requestPromise
}