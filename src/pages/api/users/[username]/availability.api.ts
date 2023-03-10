import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const referencedDate = dayjs(String(date))
  const isPastDate = referencedDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referencedDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({
    length: endHour - startHour,
  }).map((_, i) => {
    return startHour + i
  })

  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referencedDate.set('hour', startHour).toDate(),
        lte: referencedDate.set('hour', endHour).toDate(),
      },
    },
    select: { date: true },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time
    )

    const isTimeInPast = referencedDate
      .set('hour', time + 3)
      .isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}
