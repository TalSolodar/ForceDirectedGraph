import { D3DragEvent, drag, select, selectAll } from 'd3';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { datum, node } from '../ForceDirectedGraph.types';
import { Circle } from './Circle/Circle';

interface CirclesProps {
    nodes: node[]
    restartDrag: () => void,
    stopDrag: () => void,
}

export const Circles = ({ nodes, restartDrag, stopDrag }: CirclesProps) => {
    let isTooltipEnabled = true;

    useEffect(() => {
        setMouseEventsListeners();
    }, []);

    function onDragStart(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        disableTooltip();
        isTooltipEnabled = false;

        !event.active && restartDrag();

        d.fx = d.x
        d.fy = d.y
    }

    function onDrag(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function onDragEnd(event: D3DragEvent<SVGCircleElement, never, never>, d: datum) {
        isTooltipEnabled = true;
        if (!event.active) {
            stopDrag()
        }
    }


    const setMouseEventsListeners = () => {
        const dragBehavior = drag<SVGCircleElement, datum>()
            .on('start', onDragStart)
            .on('drag', onDrag)
            .on('end', onDragEnd);

        dragBehavior(selectAll('.node, .label'));
        
        selectAll('.node, .label')
            .on("mouseover", displayTooltip)
            .on("mouseleave", disableTooltip)
    }


    const displayTooltip = (event: any, d: any) => {
        const tooltip = select('.tooltip');

        if (isTooltipEnabled) {
            tooltip.transition()
                .duration(300)
                .style("visibility", "visible");

            return tooltip.html("<h4>" + d.name + "</h4>")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");

        }
    }

    const disableTooltip = () => {
        return select('.tooltip').style("visibility", "hidden");
    }

    return (
        <g className='nodes'>
            {nodes.map(node => (
                <Circle node={node} key={`node-${uuidv4()}`} />
            ))}
        </g>
    )
}