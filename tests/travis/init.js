'use strict';

const con = require('manakin').global;
const dbHeader = require('./headers');
const promise = dbHeader.defPromise;
const header = dbHeader({
    query: e => {
        // eslint-disable-next-line
        console.info(e.query); // print all of the queries being executed;
    },
    promiseLib: promise,
    capSQL: true
});

con.success.bright = true;
con.error.bright = true;

const pgp = header.pgp;
const db = header.db;

(function () {

    db.tx('', function* (t) {
            // drop all tables;
            yield t.none('DROP TABLE IF EXISTS users');

            // create all tables;

            yield t.none('CREATE TABLE user(id integer, email text, password test)');

        })
        .then(() => {
            // eslint-disable-next-line
            console.success('*** SUCCESS ***');
        })
        .catch(error => {
            // eslint-disable-next-line
            console.error('FAILED:', error);
        })
        .finally(pgp.end);
}());