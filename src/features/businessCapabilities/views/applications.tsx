import React from "react";
import {BusinessCapability} from "../state/businessCapabilityState";
import styles from './applications.module.css';
import {Card} from "./card";

export interface ApplicationsProps {
    applications?: BusinessCapability[];
    decoratorClassname?: string;
}

export const Applications = (({applications, decoratorClassname} : ApplicationsProps) => {
    return (
        <div className={`${styles.cardContainer} ${decoratorClassname}`}>
            {applications?.map( x => {
                return (
                    <Card key={x.id} id={x.id} title={x.name} >
                        <p>{x.bcap3}</p>
                        <p>Total Spend: <b>${x.spend}</b></p>
                    </Card>
                )
            })}
        </div>
    )
})