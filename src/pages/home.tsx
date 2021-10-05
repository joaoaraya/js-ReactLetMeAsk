import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

/// No React é preciso Importar as imagens antes de colocar os links
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

// Importar Firebase
import { database } from '../services/firebase';

// Importar componentes..
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

// Importar o estilo geral da página
import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    /// Entar em um Sala
    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        // Verificar se o codigo da Room está vazio (não execute nada)
        if (roomCode.trim() === '') {
            return;
        }

        // Procurar no banco de dados se essa room ja existe
        // OBS 1: .get busca todos os registos no caso (o value dentro de .ref)
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        // Se não existir...
        if (!roomRef.exists()) {
            alert('A sala não existe');
            return;
        }

        // Se existir... me redirecionar o link da sala
        history.push(`/rooms/${roomCode}`)
    }

    // Obs1: 'aside' é uma lateral OU coluna no html / 'Main' é a coluna principal / 
    // Obs2: 'Form' uma area de formularios com botão de enviar para o servidor
    // Obs3: Ao invés de usar Class nas tags, use className
    // Obs4: as tags usadas em letras Maiúsculas, são: componentes

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas da sua adiencia em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit"> Entrar na sala </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}