// importar funções do react
import { useEffect, FormEvent, useState } from 'react';
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
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('');

    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        /// Ouvir alterações de dados do firebase (once = 1x), (on = sempre)
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]); // [] os dados sao recarregados se nudar a url

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
                    <img src={logoImg} />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
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

                {JSON.stringify(questions)}
            </main>
        </div>
    );
}