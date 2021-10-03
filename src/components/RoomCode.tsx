// Importar imagens
import copyImg from '../assets/images/copy.svg';

// Importar o estilo desse componente
import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className='room-code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}