import React, {useCallback, useEffect, useReducer} from "react";

import styles from './app.module.css';
import {getBusinessCapabilities} from "./features/businessCapabilities/apis/businessCapabilities";
import {
    appReducer, capabilitySelectedAction,
    loadDataAction,
    loadDataCompleteAction,
    loadDataFailedAction, rangeFilterChangedAction,
} from "./appReducer";
import {
    BusinessCapabilityState,
    initialState, Range
} from "./features/businessCapabilities/state/businessCapabilityState";
import {SideNav} from "./features/businessCapabilities/views/sideNav";
import {Applications} from "./features/businessCapabilities/views/applications";

function App() {

    const [state, dispatch] = useReducer(appReducer, initialState,(state: BusinessCapabilityState) => {
        return {...initialState, ...state}
    });

    const onSelectionChanged = useCallback((field: string, value: string) => {
        dispatch(capabilitySelectedAction(field, value));
    }, []);

    const onRangeChanged = useCallback((range: Range) => dispatch(rangeFilterChangedAction(range)), []);

    useEffect(() => {
        dispatch(loadDataAction());
        getBusinessCapabilities()
            .then(data => dispatch(loadDataCompleteAction(data)))
            .catch(error => dispatch(loadDataFailedAction(error)));
    }, []);

  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>Pharos Coding Exercise</div>
        <SideNav decoratorClassName={styles.sidePanel}
                 tree={state.tree}
                 onSelectionChanged={onSelectionChanged}
                 range={state.defaultRange}
                 onRangeChanged={onRangeChanged} />

        <Applications decoratorClassname={styles.content} applications={state.filteredApplications} />
        <div className={styles.footer}>Footer</div>
    </div>
  );
}

export default App;
