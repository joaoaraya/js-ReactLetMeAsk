// importar funções do react
import { useHistory, useParams } from 'react-router-dom'

/// No React é preciso Importar as imagens antes de colocar os links
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

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
    //const { user } = useAuth();
    const history = useHistory()
    const params = useParams<RoomParams>();

    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    /// Encerrar Sala
    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/'); // voltar para o incio
    }

    /// Deletar pergunta
    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        > Encerrar sala</Button>
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
                            >
                                <Button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="deletar pergunta" />
                                </Button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}