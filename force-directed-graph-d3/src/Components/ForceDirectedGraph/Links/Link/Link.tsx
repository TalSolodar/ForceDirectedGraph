import { useEffect, useRef } from "react";
import { link } from "../../ForceDirectedGraph.types"
import { select } from "d3";

interface LinkProps {
    link: link;
}

export const Link = ({ link }: LinkProps) => {
    const linkRef = useRef<SVGLineElement | null>(null);

    useEffect(() => {
    if (linkRef.current){
        select(linkRef.current)
        .data([link])
    }

    }, []);
    
    return (
        <line
            ref={linkRef}
            className="link"
            stroke="blue"
            strokeWidth={3}
        />
    )
}