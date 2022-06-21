import fetch from 'node-fetch';

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

const API_KEY = '9213432dsdajl3423209dfsdlfj43534sdfjsdfdljf322289479ddfd';

let jsondata;

exports.handler = async (event, context) => {
  const response = await fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    })
  }
};
