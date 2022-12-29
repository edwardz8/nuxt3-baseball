import { getHitters } from '~/server/database/repositories/hitterRepository';

export default defineEventHandler(async (event) => {
    const hitters = await getHitters()
    return hitters
})