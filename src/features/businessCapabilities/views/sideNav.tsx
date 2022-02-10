import React, {useCallback} from 'react';
import {Range, TreeNode} from "../state/businessCapabilityState";
import styles from './sideNav.module.css';
import {AppFilter} from "./appFilter";

export interface SideNavProps {
    tree?: TreeNode[];
    decoratorClassName?: string;
    onSelectionChanged: (field: string, value: string) => void;
    range?: Range;
    onRangeChanged: (range: Range) => void;
}

export class SideNav extends React.Component<SideNavProps, any> {

    onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const el = e.target as HTMLSpanElement;
        ((el.parentElement as HTMLElement).querySelector(`.${styles.nested}`) as HTMLElement)?.classList.toggle(styles.active);
        el.classList?.toggle(styles.caretDown);

        const value = e.currentTarget.dataset.id;
        const level = value?.split(' ').pop()?.split('.').length;

        const field = level && `bcap${level}`
        field && value && this.props.onSelectionChanged(field, value);
        console.log('selected', field, value);
    };

    position = 0;

    render() {
        const {decoratorClassName, tree, range, onRangeChanged} = this.props;

        return (
            <aside className={`${decoratorClassName}`}>
                <ul className={styles.treeWrapper}>
                    {tree?.map((x: TreeNode) => <li key={x.key}>
                        <span className={styles.caret} data-id={x.key} onClick={this.onClickHandler}>{x.title}</span>
                        {x.children && this.renderTree(x.children)}
                    </li>)}
                </ul>
                <AppFilter range={range} onRangeChanged={onRangeChanged}  />
            </aside>
        )
    }

    renderTree (tree: TreeNode[]) {

        return (
            <ul className={styles.nested}>
                {
                    tree.map((x: TreeNode) => {
                        return (
                            <li key={x.key}>
                                { x?.children ?
                                    <>
                                        <span className={styles.caret} data-id={x.key} onClick={this.onClickHandler}>{x.title}</span>
                                        {this.renderTree(x.children)}
                                    </>
                                    :
                                    <span className={styles.leaf} data-id={x.key} onClick={this.onClickHandler}>{x.title}</span>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

