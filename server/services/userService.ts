import { IUser } from "~~/types/IUser";
import { RegistrationRequest } from "~~/types/IRegistration";
import { validate } from '~~/server/services/validator'

export async function validateUser(data: RegistrationRequest): Promise<FormValidation> {
    const errors = await validate(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser | undefined) {
    if (!user) {
        return user
    }

    delete user.password
    delete user.loginType

    return user 
}