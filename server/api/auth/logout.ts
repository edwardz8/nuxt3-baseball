import { CompatibilityEvent, setCookie, eventHandler } from "h3";

export default eventHandler(async (event: CompatibilityEvent) => {
    setCookie(event, 'auth_token', null)
})