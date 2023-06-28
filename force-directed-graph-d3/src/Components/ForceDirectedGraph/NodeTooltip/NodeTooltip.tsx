import { select, selectAll } from 'd3';
import { useEffect, useRef } from 'react';
import './NodeTooltip.css';

export const NodeTooltip = () => {
    const circleTooltip = useRef<HTMLDivElement | null>(null);

    const tooltip_in = (event: any, d: any) => {
        console.log(event)
        const tooltip = select(circleTooltip?.current);

        tooltip.transition()
            .duration(300)
            .style("visibility", "visible");

        return tooltip.html("<h4>" + d.name + "</h4>")
            .style("top", event.pageY + "px")
            // .style("left", event.pageX + "px");
            .style("left", (event.pageX - (select('.tooltip')?.node() as any)?.offsetWidth - 5) + "px")
    }

    const tooltip_out = () => {
        const tooltip = select(circleTooltip?.current);

        return tooltip
            .transition()
            .duration(200)
            .style("visibility", "hidden");
    }

    useEffect(() => {
        selectAll('.node')
            .on("mouseover", tooltip_in) // when the mouse hovers a node, call the tooltip_in function to create the tooltip
            .on("mouseout", tooltip_out)
    }, []);

    return (
        <div className='tooltip' ref={circleTooltip}>a</div>
    );
}