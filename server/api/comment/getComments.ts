import { getCommentsByPlayer } from '~/server/database/repositories/commentRepository';

export default eventHandler(async (event) => {
    const query = getQuery(event)
    const playerId = query.playerId

    const comment = await getCommentsByPlayer(playerId)

    return comment
})
