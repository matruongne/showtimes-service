const Screen = require('../models/screen.model')
const Showtime = require('../models/showtime.model')
const { REDIS_SETEX, REDIS_DEL } = require('./redis.service')

class ShowTimeService {
	async addShowtime({ showDateId, screenId, showTime }) {
		try {
			let ShowtimeAdd = await Showtime.findOne({
				where: {
					show_date_id: showDateId,
					show_time: showTime,
				},
			})

			if (!ShowtimeAdd) {
				ShowtimeAdd = await Showtime.create({
					show_date_id: showDateId,
					show_time: showTime,
				})
			}

			await Screen.update(
				{ showtime_id: ShowtimeAdd.showtime_id },
				{ where: { screen_id: screenId } }
			)

			const cacheKey = `showtimes:${showDateId}`
			await REDIS_SETEX(cacheKey, 86400, JSON.stringify(ShowtimeAdd))

			return ShowtimeAdd
		} catch (error) {
			console.error('[Add Showtime] Error:', error.message)
			throw new Error('Failed to add showtime.')
		}
	}

	async updateShowtime({ showtimeId, showTimeUpdate }) {
		const cacheKey = `showtime:${showtimeId}`

		try {
			const existingShowtime = await Showtime.findByPk(showtimeId)
			const { showTime } = showTimeUpdate
			if (!existingShowtime) {
				throw new Error('Showtime not found.')
			}

			const showtimeUpdated = await Showtime.update(
				{ show_time: showTime },
				{ where: { showtime_id: showtimeId } }
			)

			const updatedShowTime = {
				...existingShowtime,
				show_time: showTime,
			}
			await REDIS_SETEX(cacheKey, 86400, JSON.stringify(updatedShowTime))

			return showtimeUpdated
		} catch (error) {
			console.error('[Update Showtime] Error:', error.message)
			throw new Error('Failed to update showtime.')
		}
	}

	async deleteShowtime({ showtimeId }) {
		const cacheKey = `showtime:${showtimeId}`

		try {
			const showtime = await Showtime.findByPk(showtimeId)
			if (!showtime) {
				throw new Error('Showtime not found.')
			}

			// Xóa showtime
			await Showtime.destroy({ where: { showtime_id: showtimeId } })

			// Xóa cache
			await REDIS_DEL(cacheKey)

			return { message: 'Showtime deleted successfully.' }
		} catch (error) {
			console.error('[Delete Showtime] Error:', error.message)
			throw new Error('Failed to delete showtime.')
		}
	}
}

module.exports = new ShowTimeService()
