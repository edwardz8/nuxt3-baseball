import { H3Event } from 'h3';
import { getCommentsByPlayer } from '~/server/database/repositories/commentRepository';

export default defineEventHandler(async (event) => {
    const query = await useQuery(event)
    const playerId = query.playerId

    const comment = await getCommentsByPlayer(playerId)

    return comment
})

function useQuery(event: H3Event) {
    throw new Error('Function not implemented.');
}
