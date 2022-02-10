import React, {useState} from 'react';
import styles from './range.module.css';
import {Range} from "../state/businessCapabilityState";

export interface RangeProps {
    range?: Range,
    onRangeChanged: (range: Range) => void;
}

export const AppFilter = (props: RangeProps) => {
    const [value, setValue] = useState(props.range?.max);
    if (!props.range) {
        return null;
    }
    const {min, max} = props.range;

    return (
        <div className={styles.rangeContainer}>
            <input className={styles.range} type={'range'} min={min} max={max} step={100} value={value}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const rval = parseInt(e.target.value);
                    console.log('range', rval);
                    setValue(rval);
                   props.onRangeChanged({min, max:rval})
               }}
            />
        </div>
    )
}