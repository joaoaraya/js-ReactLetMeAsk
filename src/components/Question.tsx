import { ReactNode } from 'react';
import cx from 'classnames';

// Importar o estilo do componente
import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode; // componentes dentro de componentes
    isAnswered?: boolean;
    isHighlighted: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return (
        <div
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered },
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}