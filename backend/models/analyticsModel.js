import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the Analytics model
const Analytics = sequelize.define('Analytics', {
  shortened_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  request_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'analytics', // Table name in database
  timestamps: false,      // No timestamps for this table
});

// Sync the model with the database
(async () => {
  await Analytics.sync(); // This will create the table if it doesn't exist
})();

export default Analytics;
