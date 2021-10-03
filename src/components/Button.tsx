// Importar todos os atributos possiveis de um botão no HTML (Evitando declarar novas props)
import { ButtonHTMLAttributes } from 'react'

// Importar o estilo desse componente
import '../styles/button.scss'

// Define a propriedade
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Exportar o botão em forma de componente (use os '...' para incluir todas os atributos vindo das propriedades)
export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    )
}