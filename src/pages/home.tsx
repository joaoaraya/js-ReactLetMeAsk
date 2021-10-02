import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom'

/// No React é preciso Importar as imagens antes de colocar os links
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

// Importar componentes..
import { Button } from '../components/Button';

// Importar o estilo geral da página
import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    // Obs1: 'aside' é uma lateral OU coluna no html / 'Main' é a coluna principal / 
    // Obs2: 'Form' uma area de formularios com botão de enviar para o servidor
    // Obs3: Ao invés de usar Class nas tags, use className
    // Obs4: as tags usadas em letras Maiúsculas, são: componentes

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas da sua adiencia em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o codigo da sala" />
                        <Button type="submit"> Entrar na sala </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}