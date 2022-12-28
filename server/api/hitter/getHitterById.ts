import { getHitterById } from '~/server/database/repositories/hitterRepository';

export default defineEventHandler(async (event) => {
    const query = await getQuery(event)
    const hitterId = query.hitterId

    const hitter = await getHitterById(+hitterId)
    return hitter
})