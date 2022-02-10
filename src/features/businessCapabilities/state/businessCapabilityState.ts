export type BusinessCapability = {
    id: string;
    name: string;
    spend: number;
    bcap1: string;
    bcap2: string;
    bcap3: string;
}

export type Selection = {
    field: string;
    value: string;
};

export enum FetchState {
    LOADING,
    READY,
    ERROR
}

export type Range = {
    min: number;
    max: number;
}

export interface BusinessCapabilityState {
    tree: TreeNode[];
    filterRange?: Range;
    defaultRange?: Range;
    selectedApps?: BusinessCapability[];
    applications?: BusinessCapability[];
    filteredApplications?: BusinessCapability[];
    selectedField?: string;
    fetchState?: FetchState;
    errorMessage?: string;
}

export const initialState: BusinessCapabilityState = {
    tree: [],
    filterRange: undefined,
    defaultRange: undefined,
    selectedApps: undefined,
    filteredApplications: undefined,
    selectedField: undefined,
    fetchState: FetchState.READY,
    errorMessage: undefined,
}

export interface TreeNode {
    key: string;
    title: string;
    children?: TreeNode[];
}
