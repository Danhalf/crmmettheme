import React, { createContext, useContext, useState } from 'react'

interface AuthContextProps {
    userId: string | null
    setUserId: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = createContext<AuthContextProps>({
    userId: null,
    setUserId: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null)
    return <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>
}
