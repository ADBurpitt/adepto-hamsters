import { auth } from '__fixtures__'

export const Auth = {
    configure: () => ({}),
    currentSession: () => ({
      idToken: { jwtToken: auth.user.signInUserSession.idToken.jwtToken }
    }),
    currentAuthenticatedUser: async () => ({ user: "mock user" })
}