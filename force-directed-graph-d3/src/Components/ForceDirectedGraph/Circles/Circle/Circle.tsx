import { select } from 'd3';
import { useEffect, useRef } from 'react';
import { node } from '../../ForceDirectedGraph.types';

interface CircleProps {
    node: node;
}

export const Circle = ({ node }: CircleProps) => {
    const circleRef = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        if (circleRef.current) {
            select(circleRef.current)
                .data([node])
        }
    }, []);

    return (
        <circle
            className="node"
            r={node.radiusSize}
            fill={node.fillColor}
            pointerEvents={undefined}
            ref={circleRef}
        />
    )
}