import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.connect()
    .then(() => {
        console.log(`Redis connection established at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}, ready to use!`);
    })
    .catch((err) => {
        console.log(`Error connecting to Redis: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, err);
    });

export default client;
