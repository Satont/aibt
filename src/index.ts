import 'dotenv/config'

import Twitch from './twitch';
import Dota from './dota';
import Mongo from './mongo';
import { bootstrap } from './api/main';

const dota = Dota.getInstance();
const twitch = Twitch.getInstance();
const mongo = Mongo.getInstance();
bootstrap()
process.on('uncaughtException', async (err) => {
  const db = await mongo.db;
  db.collection('errors').insertOne({
    message: err.message,
    name: err.name,
    stack: err.stack,
    createdAt: new Date(),
  }).catch(() => {}).then(() => console.log(err));
});
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  Promise.all([
    twitch.exit(),
    dota.exit(),
    mongo.exit()]).then(() => process.exit(0));
});
