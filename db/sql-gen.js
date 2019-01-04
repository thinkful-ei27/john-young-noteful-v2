'use strict';

const axios = require('axios');

const values = [];

const baconIpsum = (function() {
  const getIpsum = function() {
    return axios('https://baconipsum.com/api/?type=meat-and-filler&sentences=1')
      .then(response => {
        return response.data[0];
      });
  };

  return {
    getIpsum,
  };
})();

Promise.all([
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
  baconIpsum.getIpsum(),
]).then(responses => {
  console.log(responses);
  values.push(responses);
  return values[0];
})
  .then(values => {
    console.log(values);
    const randomNumber = Math.floor((Math.random() * 5) + 1);
    const sqlValues = [];
    for (let value in values) {
      sqlValues.push(values[value], values[value], randomNumber);
    }
    return sqlValues;
  })
  .then(sqlValues => {
    console.log(sqlValues);
  });