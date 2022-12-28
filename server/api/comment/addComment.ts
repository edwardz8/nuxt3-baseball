// import { CompatibilityEvent } from 'h3'
import { addComment } from '~/server/database/repositories/commentRepository';

export default async () => {
    const body = await useBody(event)

    const commentData = {
        userId: body.userId,
        playerId: body.playerId,
        comment: body.comment
    }

    const comment = await addComment(commentData)

    return comment
}
function useBody(event: Event | undefined) {
    throw new Error('Function not implemented.');
}

