import {
    BusinessCapability,
    BusinessCapabilityState,
    FetchState, Range
} from "./features/businessCapabilities/state/businessCapabilityState";
import {transformToTree} from "./features/businessCapabilities/mappers/mapToTree";


export enum ActionTypes {
    LoadDataBegin = 'LOAD_DATA_BEGIN',
    LoadDataFailed = 'LOAD_DATA_FAILED',
    LoadDataEnd = 'LOAD_DATA_END',
    CapabilitySelected = 'CAPABILITY_SELECTED',
    RangeFilterChanged = 'RANGE_FILTER_CHANGED'
}

type Loading = {type: ActionTypes.LoadDataBegin};
type LoadingComplete = {type: ActionTypes.LoadDataEnd, payload: BusinessCapability[]};
type LoadingError = {type: ActionTypes.LoadDataFailed, error: Error};
type CapabilitySelected = {type: ActionTypes.CapabilitySelected, payload: { field: string, value: string}};
type AppFilterRange = {type: ActionTypes.RangeFilterChanged, payload: Range}
export const loadDataAction = (): Loading => ({type: ActionTypes.LoadDataBegin});

export const loadDataCompleteAction = (data: BusinessCapability[]) : LoadingComplete => ({type: ActionTypes.LoadDataEnd, payload: data});

export const loadDataFailedAction = (error: Error): LoadingError => ({type: ActionTypes.LoadDataFailed,  error});

export const capabilitySelectedAction = (field: string, value: string) : CapabilitySelected => ({type: ActionTypes.CapabilitySelected, payload: {field, value}});

export const rangeFilterChangedAction = (range: Range) : AppFilterRange => ({type: ActionTypes.RangeFilterChanged, payload: range});

export type AppActions = Loading | LoadingComplete | LoadingError | CapabilitySelected | AppFilterRange;

const filterApps = (state: BusinessCapabilityState, data: { field: string, value: string }) => {
        const newState = {...state};
        const {field, value} = data;
        newState.selectedField = field;
        newState.selectedApps = newState.applications?.filter((x: any) => x[field] === value) as BusinessCapability[];
        newState.filteredApplications = newState.selectedApps;
        const range = newState.selectedApps.reduce((prev, current) => {
            prev.min = Math.min(current.spend, prev.min);
            prev.max = Math.max(current.spend, prev.max);
            return prev;
        }, {min: newState.selectedApps[0].spend, max: 0});

        newState.defaultRange = range;
        return newState;
}

const filterAppsByRange = (state: BusinessCapabilityState, range: Range) => {
    const newState = {...state};
    newState.filterRange = range;
    const {min, max} = range;
    newState.filteredApplications = newState.selectedApps?.filter(x => x.spend >= min && x.spend <= max);
    return newState;
}

export const appReducer = (state: BusinessCapabilityState, action: AppActions): BusinessCapabilityState => {
    const {type} = action;
    switch (type) {
        case ActionTypes.LoadDataBegin:
            return {...state, fetchState: FetchState.LOADING, errorMessage: ''}
        case ActionTypes.LoadDataEnd:
            return ({...state, applications: action.payload, errorMessage: '', tree: transformToTree(action.payload)})
        case ActionTypes.LoadDataFailed:
            return ({...state, fetchState: FetchState.ERROR, errorMessage: action.error.message})
        case ActionTypes.CapabilitySelected:
            console.log('Capability Selected ', action.payload);
            return filterApps(state, action.payload);
        case ActionTypes.RangeFilterChanged:
            console.log('Range Changed', action.payload);
            return filterAppsByRange(state, action.payload);
        default:
            return state;
    }
}