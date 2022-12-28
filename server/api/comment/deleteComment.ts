import { H3Event } from 'h3';
import { deleteComment } from '~/server/database/repositories/commentRepository';

export default defineEventHandler(async (event) => {
    const query = await useQuery(event)
    const commentId = query.commentId

    const res = await deleteComment({ id: commentId })

    return res
})

function useQuery(event: H3Event) {
    throw new Error('Function not implemented.');
}
