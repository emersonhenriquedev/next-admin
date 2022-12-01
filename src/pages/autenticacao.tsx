import { useState } from "react";
import Image from "next/image";

import picture from '../../public/picture.jpg';
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";

export default function Autenticacao() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState<string | null>(null)

    function exibirErro(msg: string, tempoEmSegundos = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoEmSegundos * 1000)
    }
    
    function submeter() {
        if (modo == 'login') {
            console.log('login')
            exibirErro('Ocorreu um erro no login!')
        } else {
            console.log('cadastrar')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <Image
                    className="h-screen w-full object-cover"
                    src={picture}
                    alt='Imagem da tela de autenticação' />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 m-10">
                <h1 className="text-3xl font-bold mb-5">{
                    modo == 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>
                {erro ? (
                    <div
                        className="
                    flex item-center bg-red-400 text-white
                    py-3 px-5 my-2 border border-red-700 rounded-lg">
                        {IconeAtencao()}
                        <span className="ml-3">{erro}</span>
                    </div>

                ) : (false)}

                <AuthInput
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail} />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha} />
                <button
                    className="
                    w-full bg-indigo-500 hover:bg-indigo-400 
                    text-white rounded-lg px-4 py-3 mt-6"
                    onClick={submeter}>

                    {modo == 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button className="
                w-full bg-red-500 hover:bg-red-400 
                text-white rounded-lg px-4 py-3" onClick={submeter}>
                    Entrar com Google
                </button>

                {modo == 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?&nbsp;
                        <a
                            onClick={() => setModo('cadastro')}
                            className='
                                text-blue-500 hover:text-blue-700
                                font-semibold cursor-pointer'>
                            Crie uma conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?&nbsp;
                        <a
                            onClick={() => setModo('cadastro')}
                            className='
                            text-blue-500 hover:text-blue-700
                            font-semibold cursor-pointer'>
                            Entre com as suas credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}
