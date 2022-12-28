import { IUser } from '~/types/IUser';
import { getUserBySessionToken } from '~~/server/services/sessionService'
import { getCookie, eventHandler } from 'h3'

export default eventHandler<IUser>(async (event) => {
    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    return user
})