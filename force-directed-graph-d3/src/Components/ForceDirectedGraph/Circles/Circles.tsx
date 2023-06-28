import { D3DragEvent, drag, selectAll } from 'd3';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { datum, node } from '../ForceDirectedGraph.types';
import { Circle } from './Circle/Circle';

interface CirclesProps {
    nodes: node[]
    restartDrag: () => void,
    stopDrag: () => void,
    width: number,
    height: number,
}


export const Circles = ({ nodes, restartDrag, stopDrag }: CirclesProps) => {

    useEffect(() => {
        setMouseEventsListeners();
    }, []);

    function onDragStart(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        if (!event.active) {
            restartDrag()
        }
        d.fx = d.x
        d.fy = d.y
    }

    function onDrag(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function onDragEnd(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        if (!event.active) {
            stopDrag()
        }
        // d.fx = null
        // d.fy = null
    }


    const setMouseEventsListeners = () => {
        const dragBehavior = drag<SVGCircleElement, datum>()
            .on('start', onDragStart)
            .on('drag', onDrag)
            .on('end', onDragEnd);

        dragBehavior(selectAll('.node'));
    }

    return (
            <g className='nodes'>
                {nodes.map(node => (
                    <Circle node={node} key={`node-${uuidv4()}`} />
                ))}
            </g>
    )
}