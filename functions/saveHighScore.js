require('dotenv').config();
const Airtable = require('airtable');
// const values = require('../configs');

Airtable.configure({
  // apiKey: values.AIRTABLE_API_KEY
  apiKey: process.env.AIRTABLE_API_KEY
});

// const base = Airtable.base(values.AIRTABLE_BASE_KEY);
// const table = base(values.AIRTABLE_TABLE_NAME);
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base(process.env.AIRTABLE_TABLE_NAME);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method is not allowed ..' }),
    }
  }

  // const { name, score } = JSON.parse(event.body);
  const body = JSON.parse(event.body);

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Bad request: body is invalid or not existed ..' })
    }
  }

  try {
    table.create(body); // add new record

    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };  
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
