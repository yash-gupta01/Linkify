import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Create a Sequelize instance and connect to PostgreSQL
const sequelize = new Sequelize(
  process.env.PG_DATABASE, // Database name
  process.env.PG_USER,     // Username
  process.env.PG_PASSWORD, // Password
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false, // Turn off SQL logging for cleaner logs
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;
