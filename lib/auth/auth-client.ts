import { createAuthClient } from "better-auth/react"

export const {
    signIn,
    signUp,
    signOut,
    forgetPassword,
    resetPassword,
    getSession,
    useSession
} = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})