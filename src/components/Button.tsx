// Importar todos os atributos possiveis de um botão no HTML (Evitando declarar novas props)
import { ButtonHTMLAttributes } from 'react'

// Importar o estilo desse componente
import '../styles/button.scss'

// Define a propriedade
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

// Exportar o botão em forma de componente (use os '...' para incluir todas os atributos vindo das propriedades)
// OBS 1: isOulined é opcional nos botoes, caso nao for usado o padrão é = false
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}