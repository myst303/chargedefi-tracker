import {useEffect, useRef} from "react";

export function useDidUpdate (callback:any, deps:any) {
    const hasMount = useRef(false)

    useEffect(() => {
        if (hasMount.current) {
            callback()
        } else {
            hasMount.current = true
        }
    }, deps)
}
