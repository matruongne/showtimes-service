const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/databases/init.mysql')
const ShowDate = require('./showdate.model')

const Showtime = sequelize.define(
	'Showtime',
	{
		showtime_id: {
			type: DataTypes.STRING(24),
			defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 24),
			primaryKey: true,
		},
		show_date_id: {
			type: DataTypes.STRING(24),
			references: {
				model: ShowDate,
				key: 'show_date_id',
			},
			allowNull: false,
		},
		show_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		available_seats: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: 'showtimes',
		timestamps: false,
	}
)

module.exports = Showtime
