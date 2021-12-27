import {Flex, useBoolean} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";


export const useHoverHighlight = () => {
    const [isHoover, setIsHoover] = useBoolean(false)
    const [bg, setBg] = useState<any>()

    const props = {
        borderRadius: 5,
        padding: 1.5,
        cursor: "pointer",
        background: bg,
        onMouseEnter: setIsHoover.on,
        onMouseLeave: setIsHoover.off
    }

    useEffect(() => {
        if(isHoover) setBg("gray.100")
        else setBg("transparent")
    }, [isHoover])

    return {setIsHoover, isHoover, bg, setBg,
        hooverProps: props}
}
