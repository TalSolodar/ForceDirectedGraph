import { select } from "d3";
import { useEffect, useRef } from "react";
import { node } from "../../ForceDirectedGraph.types";

interface LabelProps {
    node: node
}

export const Label = ({ node }: LabelProps) => {
    const labelRef = useRef<SVGTextElement | null>(null);

    useEffect(() => {
        select(labelRef?.current).data([node]);
    }, []);

    return (
        <text
            stroke="none"
            className="label"
            cursor={"default"}
            ref={labelRef}
            textAnchor="middle"
            dy={'.35rem'}>
            {node.name}
        </text>
    )
}