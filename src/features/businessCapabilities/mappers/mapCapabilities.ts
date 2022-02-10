import {BusinessCapability} from "../state/businessCapabilityState";

export const mapBusinessCapabilities = (x: { id: string, name: string, spend: number, BCAP1: string, BCAP2: string, BCAP3: string }): BusinessCapability => {
    return {
        id: x.id,
        name: x.name,
        spend: x.spend,
        bcap1: x.BCAP1,
        bcap2: x.BCAP2,
        bcap3: x.BCAP3
    } as BusinessCapability;
}