require('../models/productCategory');
require('../models/product');
require('../models/productFamily');
require('../models/recipe');


var path = require('path');
var rp = require('request-promise');
var mongoose = require('mongoose');
var _ = require('underscore');
var apiai = require('apiai');


var Product = mongoose.model('Product');
var Category = mongoose.model('ProductCategory');
var Family = mongoose.model('ProductFamily');
var Recipe = mongoose.model('Recipe');


var devKey = 'Bearer 08806fc3dadb4d229137769ed993fd35';
var apiUrl = 'https://api.api.ai/v1/';


function getAllEntities() {
    var options = {
        uri: apiUrl + 'entities',
        headers: {'authorization': devKey},
        json: true
    };
    return rp(options)
}

function getEntityById(id) {
    var options = {
        uri: apiUrl + 'entities/' + id,
        headers: {'authorization': devKey},
        json: true
    };
    return rp(options)
}

function addEntityWithEntries(entity) {
    var options = {
        method: 'POST',
        uri: apiUrl + 'entities/',
        headers: {'authorization': devKey},
        body: entity,
        json: true
    };
    return rp(options)
}

function addEntriesForEntityId(id, entries) {
    var options = {
        method: 'POST',
        uri: apiUrl + 'entities/' + id + '/entries',
        headers: {'authorization': devKey},
        body: entries,
        json: true
    };
    return rp(options)
}

function addProduct(product) {
    getAllEntities()
        .then(function(entities) {
            if (entities.length) {
                var entityId = '';

                for (var i = 0; i < entities.length; i++) {
                    if (entities[i].name == product.category) {
                        entityId = entities[i].id;
                        break;
                    }
                }

                var entries = {
                    value: product.name,
                    synonyms: [product.name, product.family]
                }

                if (entityId) {
                    addEntriesForEntityId(entityId, entries).then(function(data) {
                        console.log(data);
                    }).catch(function (err) { console.log(err); });

                } else {
                    var entity = {
                        name: product.category,
                        entries: [entries]
                    }
                    addEntityWithEntries(entity);
                }
            }

        }).catch(function(err) { console.log(err); });
}


exports.addProduct = addProduct;