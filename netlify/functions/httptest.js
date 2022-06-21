import fetch from 'node-fetch';

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

const API_KEY = '9213432dsdajl3423209dfsdlfj43534sdfjsdfdljf322289479ddfd';

let jsondata;

exports.handler = async (event, context) => {
  let response = await fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World"
    })
  }

    // .then((response) => response.json())
    // .then((data) => {
    //   jsondata = JSON.stringify(data);
    //   return ({
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "Hello World" }),
    //   });
    // })
};


// exports.handler = async (event, context) => {
//   try {
//     const response = await fetch(API_ENDPOINT);
//     const data = await response.json();
//     return { statusCode: 200, body: JSON.stringify({ data }) };
//   } catch (error) {
//     console.log(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed fetching data' }),
//     };
//   }
// };
