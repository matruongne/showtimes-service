const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/databases/init.mysql')
const Showtime = require('./showtime.model')

const ShowtimeSeat = sequelize.define(
	'ShowtimeSeat',
	{
		showtime_seat_id: {
			type: DataTypes.STRING(24),
			defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 24),
			primaryKey: true,
		},
		showtime_id: {
			type: DataTypes.STRING(24),
			references: {
				model: Showtime,
				key: 'showtime_id',
			},
			allowNull: false,
		},
		seat_id: {
			type: DataTypes.STRING(24),
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('available', 'reserved', 'occupied'),
			defaultValue: 'available',
		},
		booking_id: {
			type: DataTypes.STRING(24),
			allowNull: true,
		},
	},
	{
		tableName: 'showtime_seats',
		timestamps: false,
	}
)

module.exports = ShowtimeSeat
