//import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom'

/// No React é preciso Importar as imagens antes de colocar os links
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// Importar componentes..
import { Button } from '../components/Button';

// Importar o estilo geral da página
import '../styles/auth.scss';

// Obs1: 'aside' é uma lateral OU coluna no html / 'Main' é a coluna principal / 
// Obs2: 'Form' uma area de formularios com botão de enviar para o servidor
// Obs3: Ao invés de usar Class nas tags, use className
// Obs4: as tags usadas em letras Maiúsculas, são: componentes

export function NewRoom() {
    //const { user } = useAuth();

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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit"> Criar sala </Button>
                    </form>
                    <p>
                        Quer entrar numa sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};