import { getHitters } from '~/server/database/repositories/hitterRepository';

export default defineEventHandler(async (event) => {
    // const query = await useQuery(event)
    // const playerId = query.playerId

    const hitters = await getHitters()
    return hitters
})