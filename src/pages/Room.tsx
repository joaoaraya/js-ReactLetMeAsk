// importar funções do react
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'

/// No React é preciso Importar as imagens antes de colocar os links
import logoImg from '../assets/images/logo.svg';

// Importar componentes
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'

// Importar firebase
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// Importar o estilo geral da página
import '../styles/room.scss';

/// tipos
type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');

    const roomId = params.id;

    async function handleCreateNewQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        // Somente se o usuario n estiver logado
        if (!user) {
            throw new Error('você precisa estar logado');
        }

        // Criar uma nova pergunta com todas as informações do usuario
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswer: false
        };

        // Se der certo enviar para o banco de dados
        await database.ref(`rooms/${roomId}/questions`).push(question);

        // Limpar a area de texto
        setNewQuestion('');
    }

    return (
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleCreateNewQuestion}>
                    <textarea
                        placeholder='O que você quer perguntar?'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className='user-info'>
                                <img src={user.avatar} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}