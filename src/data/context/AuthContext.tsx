import { createContext, useState, useEffect } from "react";
import route from "next/router";
import firebase from "../../firebase/config";
import Cookies from "js-cookie";
import Usuario from "../../model/Usuario";

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    loginGoogle: () => Promise<void>
    logout: () => void
    login: (email: string, senha: string) => void
    cadastrar: (email: string, senha: string) => void
}

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

const AuthContext = createContext<AuthContextProps>({})

export function AuthProvider(props) {
    const [usuario, setUsuario] = useState<Usuario>()
    const [carregando, setCarregando] = useState<boolean>(true)

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)

            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)

            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }

    async function login(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }


    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])


    function gerenciarCookie(logado: boolean) {
        if (logado) {
            Cookies.set('admin-template-cod3r-auth', logado, { expires: 7 })
        } else {
            Cookies.remove('admin-template-cod3r-auth')
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout,
            login,
            cadastrar,
            carregando
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
