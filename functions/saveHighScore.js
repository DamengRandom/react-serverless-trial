require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base(process.env.AIRTABLE_TABLE_NAME);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method is not allowed ..' }),
      }
    }
  
    const body = JSON.parse(event.body);
  
    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Bad request: body is invalid or not existed ..' })
      }
    }

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
