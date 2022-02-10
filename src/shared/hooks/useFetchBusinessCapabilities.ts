import React, {useEffect} from 'react';
import {loadDataAction, loadDataCompleteAction, loadDataFailedAction} from "../../appReducer";
import {getBusinessCapabilities} from "../../features/businessCapabilities/apis/businessCapabilities";

export const useFetchBusinessCapabilities = (dispatch: React.DispatchWithoutAction) => {
    // useEffect(() => {
    //     dispatch(loadDataAction());
    //     getBusinessCapabilities()
    //         .then(data => dispatch(loadDataCompleteAction(data)))
    //         .catch(error => dispatch(loadDataFailedAction(error)));
    // }, []);
}