require('dotenv').config();
const Airtable = require('airtable');
const values = require('../configs');

Airtable.configure({
  // apiKey: values.AIRTABLE_API_KEY
  apiKey: process.env.AIRTABLE_API_KEY
});

// const base = Airtable.base(values.AIRTABLE_BASE_KEY);
// const table = base(values.AIRTABLE_TABLE_NAME);
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base(process.env.AIRTABLE_TABLE_NAME);

exports.handler = async () => {
  try {
    const records = await table.select({}).firstPage();
    // const formattedRecords = records.map(record => ({
    //   id: record.id,
    //   fields: record.fields,
    //   createdAt: record._rawJson.createdTime
    // }));
    const formattedRecords = records.map(record => record._rawJson);
    
    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords)
    };  
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};
