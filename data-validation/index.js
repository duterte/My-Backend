const { Estate } = require('../models/submitlisting');
require('../util');

function validateData(data) {
  const { id, ...rest } = data;
  const unrecognizedKeys = Object.keys(rest).reduce((acc, curr) => {
    const search = Object.keys(Estate.schema.obj).find(prop => prop === curr);
    if (!search) return [...acc, curr];
    return acc;
  }, []);

  return new Promise((resolve, reject) => {
    if (unrecognizedKeys.length > 0) {
      const error = new Error(unrecognizedKeys.join(', '));
      error.name = 'UnrecognizedProperties:';
      reject(error);
    } else {
      resolve(data);
    }
  });
}

module.exports = validateData;
