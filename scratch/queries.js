'use strict';

const knex = require('../knex');

let searchTerm = 'gaga';
knex
  .select('id', 'title', 'content')
  .from('notes')
  .modify(function (queryBuilder) {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

let noteParam = 1;
knex
  .select('id', 'title', 'content')
  .from('notes')
  .where('id', noteParam)
  .orderBy('id')
  .then(results => {
    console.log(results[0]);
  })
  .catch(err => {
    console.log(err);
  });

// let updateObj = {
//   title: 'An updated title for the first item in the DB',
//   content: 'Included with new content as well!'
// };
knex('notes')
  .where({id: noteParam})
  .update(updateObj, ['id', 'title', 'content'])
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.log(err);
  });

knex
  .insert({
    title: 'This is an inserted note title',
    content: 'This is inserted note content',
  }, ['id', 'title', 'content'])
  .into('notes')
  .then(results => console.log(results[0]));

let deleteId = 1001;
knex('notes')
  .where('id', deleteId)
  .del()
  .then(results => console.log(results));