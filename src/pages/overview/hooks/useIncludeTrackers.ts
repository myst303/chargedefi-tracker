import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import {stringToBoolean} from "../../../common/helpers/util";

const cookies = new Cookies();

export const useIncludeTrackers = () => {
    const [includeBasic, setIncludeBasic] = useState<boolean>(true);
    const [includeExpansionDebt, setIncludeExpansionDebt] = useState<boolean>(true)
    const [includeBeefy, setIncludeBeefy] = useState<boolean>(true);
    const [includeFarms, setIncludeFarms] = useState<boolean>(true);
    const [includeBoardroom, setIncludeBoardroom] = useState<boolean>(true);


    useEffect(() => {
        setIncludeBasic(stringToBoolean(cookies.get('includeBasic')))
        setIncludeExpansionDebt(stringToBoolean(cookies.get('includeExpansionDebt')))
        setIncludeBeefy(stringToBoolean(cookies.get('includeBeefy')))
        setIncludeFarms(stringToBoolean(cookies.get('includeFarms')))
        setIncludeBoardroom(stringToBoolean(cookies.get('includeBoardroom')))

    }, [])

    useEffect(() => {
        cookies.set('includeBasic', includeBasic)
        cookies.set('includeExpansionDebt', includeExpansionDebt)
        cookies.set('includeBeefy', includeBeefy)
        cookies.set('includeFarms', includeFarms)
        cookies.set('includeBoardroom', includeBoardroom)

    }, [includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom])

    return {
        includeBasic, includeExpansionDebt, includeBeefy, includeFarms, includeBoardroom,
        setIncludeBasic, setIncludeExpansionDebt, setIncludeBeefy, setIncludeFarms, setIncludeBoardroom
    }
}
