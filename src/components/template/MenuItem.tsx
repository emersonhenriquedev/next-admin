import Link from 'next/link'

interface MenuItem {
    url: string
    texto: string
    icone: any
}

export default function MenuItem(props: MenuItem) {
    return (
        <li className="hover:bg-gray-200">
            <Link href={props.url} 
                className="flex flex-col justify-center items-center w-20 h-20">
                    {props.icone}
                    <span className='text-xs font-light text-gray-600'>
                        {props.texto}
                    </span>
            </Link>
        </li>
    )
}