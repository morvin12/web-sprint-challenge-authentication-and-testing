const db = require('../../data/dbConfig');

async function findBy (filter){
    return await db('users').where(filter)
}

async function create (user){
    const id = await db('users').insert(user);
    return findBy({ id });
}

module.exports = { findBy, create };