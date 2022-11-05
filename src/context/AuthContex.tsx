import { createContext, ReactNode, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import *as  WebBrowser from 'expo-web-browser'

interface UserProps {
  name: string;
  avatarUrl: string;
}
interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;

}
export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '225563521865-vjg1t96889l7u3molr4rqk0j4a6rtt4i.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']


  })

  console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync();
    } catch (error) {
      console.log(error)
      throw error;

    } finally {
      setIsUserLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user: {
        name: 'Henrique',
        avatarUrl: 'http://github.com/rickcunha05.png',
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}