const ShowDate = require('./showdate.model')
const Showtime = require('./showtime.model')
const screenSeat = require('./screenSeat.model')
const Screen = require('./screen.model')

ShowDate.hasMany(Showtime, { foreignKey: 'show_date_id', onDelete: 'CASCADE' })

Showtime.belongsTo(ShowDate, { foreignKey: 'show_date_id', onDelete: 'CASCADE' })

Showtime.hasMany(Screen, { foreignKey: 'showtime_id', onDelete: 'SET NULL' })
Screen.belongsTo(Showtime, { foreignKey: 'showtime_id' })

module.exports = {
	ShowDate,
	Showtime,
	screenSeat,
}
