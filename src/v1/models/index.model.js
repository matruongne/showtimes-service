const ShowDate = require('./showdate.model')
const Showtime = require('./showtime.model')
const ShowtimeSeat = require('./showtimeSeat.model')

ShowDate.hasMany(Showtime, { foreignKey: 'show_date_id', onDelete: 'CASCADE' })
Showtime.hasMany(ShowtimeSeat, { foreignKey: 'showtime_id', onDelete: 'CASCADE' })

Showtime.belongsTo(ShowDate, { foreignKey: 'show_date_id', onDelete: 'CASCADE' })

module.exports = {
	ShowDate,
	Showtime,
	ShowtimeSeat,
}
