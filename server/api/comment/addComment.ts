import { addComment } from '~/server/database/repositories/commentRepository';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const commentData = {
        userId: body.userId,
        playerId: body.playerId,
        comment: body.comment
    }

    const comment = await addComment(commentData)

    return comment
})

