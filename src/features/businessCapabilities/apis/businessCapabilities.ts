import {mapBusinessCapabilities} from "../mappers/mapCapabilities";

export let getBusinessCapabilities = async () =>{
    try {
        const response = await fetch('http://localhost:8080/data');
        if (response.ok) {
            const data = await response.json();
            return data.map(mapBusinessCapabilities);
        }
    } catch(e) {
        console.error('error occurred while fetching data', e);
    }
    return Error('unExpected error');
}
