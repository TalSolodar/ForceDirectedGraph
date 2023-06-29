import { select } from 'd3';
import { useEffect, useRef } from 'react';
import { node } from '../../ForceDirectedGraph.types';

interface CircleProps {
    node: node;
}

export const Circle = ({ node }: CircleProps) => {
    const circleRef = useRef<SVGCircleElement | null>(null);
    const nodeContainerRef = useRef<SVGSVGElement | null>(null);
    const labelRef = useRef<SVGTextElement | null>(null);

    useEffect(() => {
        if (circleRef.current) {
            select(circleRef.current)
                .data([node])
        }

        if (labelRef) {
            select(labelRef?.current)
                .data([node])
        }

        if(nodeContainerRef?.current){
            select(nodeContainerRef.current)
            .data([node]);
        }
    }, []);

    return (
        <g className='node-container' ref={nodeContainerRef}>
            <circle
                className="node"
                r={node.radiusSize}
                fill={node.fillColor}
                pointerEvents={undefined}
                ref={circleRef}
            />

            <text
                stroke="none"
                ref={labelRef}
                className="label"
                cursor={"default"}
                textAnchor="middle"
                dy={'.35rem'}>
                {node.name}
            </text>
        </g>
    )
}