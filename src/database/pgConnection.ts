import pgPromise from 'pg-promise';
import { env } from '../common/utils/envConfig';

const pgp = pgPromise(/* options */);
const db = pgp(env.DATABASE_URL);

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });

export { db };