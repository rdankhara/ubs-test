import React from 'react';
import styles from './treeView.module.css';

const data: string | object [] = [{beverages: ['water', 'coffee']}]

export const TreeView = (props: any) => {

    return (
        <ul className={styles.treeViewWrapper}>

        </ul>
    )
}