import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the URL model
const Url = sequelize.define('Url', {
  original_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shortened_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'urls', // Table name in database
  timestamps: true,  // Enable timestamps (createdAt, updatedAt)
});

// Sync the model with the database
(async () => {
  await Url.sync(); // This will create the table if it doesn't exist
})();

export default Url;
