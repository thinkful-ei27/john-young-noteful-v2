'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const folders = express.Router();
const knex = require('../knex');

// Get All (and search by query)
folders.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  
  knex
    .select('id', 'name')
    .from('folders')
    // .modify(queryBuilder => {
    //   if (searchTerm) {
    //     queryBuilder.where('title', 'like', `%${searchTerm}%`);
    //   }
    // })
    .orderBy('folders.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// Get a single item
folders.get('/:id', (req, res, next) => {
  const id = req.params.id;
  
  knex
    .select('id', 'name')
    .from('folders')
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
folders.put('/:id', (req, res, next) => {
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
  if (!updateObj.title) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex('folders')
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
folders.post('/', (req, res, next) => {
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
    .into('folders')
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      next(err);
    });
});

// Delete an item
folders.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  
  knex('folders')
    .where('id', id)
    .del()
    .then(results => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = folders;