import { addLike } from '~/server/database/repositories/likeRepository';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const likeData = {
        userId: body.userId,
        playerId: body.playerId,
    }

    const like = await addLike(likeData)

    return like
})