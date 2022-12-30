import Head from "next/head"
import Image from "next/image"
import Router from "next/router"
import loading from '../../../public/loading.gif'
import useAuth from "../../data/hook/useAuth"

export default function ForcarAutenticacao(props) {
    const { usuario, carregando } = useAuth()

    function renderConteudo() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes('admin-template-cod3r-auth')) {
                                window.location.href="/autenticacao"
                            }  
                        `
                    }}>

                    </script>
                </Head>
                {props.children}
            </>
        )
    }

    function renderCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt="Carregando" />
            </div>
        )
    }
    if (!carregando && usuario?.email) {
        return renderConteudo()
    } else if (carregando) {
        return renderCarregando()
    } else {
        Router.push('/autenticacao')
        return null
    }

}
