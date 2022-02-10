import React, {ReactNode} from 'react';
import styles from './card.module.css';

export interface CardProps {
    id: string;
    title?: string;
    children?: ReactNode | undefined;
}

export const Card = (props: CardProps) => {
    if (!props) {
        return null;
    }

    const {id, title, children} = props;

    return (
        <div className={styles.card} key={id}>
            <header className={styles.header}>
                {title}
            </header>
            <div className={styles.content}>
            {children}
            </div>
        </div>
    )
}