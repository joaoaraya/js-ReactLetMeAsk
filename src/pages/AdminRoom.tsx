// importar funções do react
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'

/// No React é preciso Importar as imagens antes de colocar os links
import logoImg from '../assets/images/logo.svg';

// Importar componentes
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode'

// Importar Hooks (componentes de funções)
import { useRoom } from '../hooks/useRooms';

// Importar firebase
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// Importar o estilo geral da página
import '../styles/room.scss';

/// tipos
type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');

    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    /// Criar nova pergunta
    async function handleCreateNewQuestion(event: FormEvent) {
        event.preventDefault();

        // se a text area estiver vazia (nao enviar pergunta) 
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
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined> Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id} // Algorito de Reconciliação
                                content={question.content}
                                author={question.author}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}