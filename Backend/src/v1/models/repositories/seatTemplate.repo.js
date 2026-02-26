const SeatLayout = require('../seatLayout.model')
const { NotFoundError } = require('../../core/error.response')

class SeatTemplateRepository {

    async addSeats({ layoutId, seats }) {
        const layout = await SeatLayout.findOne({ layoutId })
        if (!layout) {
            throw new NotFoundError({ message: 'Layout not found' })
        }

        layout.templates.push(...seats)
        layout.totalSeats = layout.templates.length
        return await layout.save()
    }

    async updateSeat({ layoutId, seatId, updateData }) {
        const layout = await SeatLayout.findOne({ layoutId })
        if (!layout) {
            throw new NotFoundError({ message: 'Layout not found' })
        }

        const seat = layout.templates.id(seatId)
        if (!seat) {
            throw new NotFoundError({ message: 'Seat not found' })
        }

        Object.assign(seat, updateData)
        return await layout.save()
    }

    async deactivateSeat({ layoutId, seatId }) {
    const layout = await SeatLayout.findOne({ layoutId })
    if (!layout) {
        throw new NotFoundError({ message: 'Layout not found' })
    }

    const seat = layout.templates.id(seatId)
    if (!seat) {
        throw new NotFoundError({ message: 'Seat not found' })
    }

    seat.status = 'inactive'
    return await layout.save()
}

}

module.exports = new SeatTemplateRepository()
