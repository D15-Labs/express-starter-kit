import pgPromise from 'pg-promise';
import { env } from '@/common/utils/envConfig';

const pgp = pgPromise(/* options */);
const db = pgp(env.DATABASE_URL);

export { db };