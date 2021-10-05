import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom'

import { FormEvent, useState } from 'react'

/// No React é preciso Importar as imagens antes de colocar os links
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// Importar componentes..
import { Button } from '../components/Button';
import { database } from '../services/firebase';

// Importar o estilo geral da página
import '../styles/auth.scss';

// Obs1: 'aside' é uma lateral OU coluna no html / 'Main' é a coluna principal / 
// Obs2: 'Form' uma area de formularios com botão de enviar para o servidor
// Obs3: Ao invés de usar Class nas tags, use className
// Obs4: as tags usadas em letras Maiúsculas, são: componentes

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // não permitir muitos espaço e nem espaço vazio
        if (newRoom.trim() === '') {
            return;
        }

        // Fazer uma seção no banco de dados com o nome 'Rooms'
        const roomRef = database.ref('rooms');

        // Se der certo(await) incluir(push) os dados (title = $newRoom(nome da room na input)
        // e authorId = (id do usuario logado)
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        // Após criar a sala no Banco de dados, redirecionar para a pagina da sala
        history.push(`/rooms/${firebaseRoom.key}`);
    }

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
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