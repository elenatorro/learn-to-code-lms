/* eslint-disable camelcase */
'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Lessons Migration', () => {
  before((done) => { // eslint-disable-line no-undef
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Lessons columns migrate', (done) => {
    knex('lessons').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'lessons_id_seq\'::regclass)'
          },

          user_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          type: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            'The columns are not the same.'
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
