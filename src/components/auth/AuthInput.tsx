interface AuthInputProps {
    label: string
    valor: any
    tipo?: 'text' | 'email' | 'password'
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label htmlFor="">{props.label}</label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                required={props.obrigatorio}
                onChange={e => props.valorMudou(e.target.value)}
                className='
                    px-4 py-3 rounded-lg
                    bg-gray-200 mt-2 border
                    focus:border-blue-500 focus:outline-none
                    focus:bg-white' />
        </div>
    )
}
