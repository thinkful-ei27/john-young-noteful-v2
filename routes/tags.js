'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const tags = express.Router();
const knex = require('../knex');

// Get All (and search by query)
tags.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
    
  knex
    .select('id', 'name')
    .from('tags')
  // .modify(queryBuilder => {
  //   if (searchTerm) {
  //     queryBuilder.where('title', 'like', `%${searchTerm}%`);
  //   }
  // })
    .orderBy('tags.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});
  
// Get a single item
tags.get('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex
    .select('id', 'name')
    .from('tags')
    .where('id', id)
    .orderBy('id')
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      next(err);
    });
});
  
// Put update an item
tags.put('/:id', (req, res, next) => {
  const id = req.params.id;
    
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];
    
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
    
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
    
  knex('tags')
    .where({id: id})
    .update(updateObj, ['id', 'name'])
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      next(err);
    });
});
  
// Post (insert) an item
tags.post('/', (req, res, next) => {
  const { name } = req.body;
    
  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
    
  knex
    .insert(newItem, ['id', 'name'])
    .into('tags')
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      next(err);
    });
});
  
// Delete an item
tags.delete('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex('tags')
    .where('id', id)
    .del()
    .then(results => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});
  
module.exports = tags;