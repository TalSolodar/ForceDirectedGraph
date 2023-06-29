import { Simulation, SimulationNodeDatum, forceLink, forceManyBody, forceSimulation, forceX, forceY, selectAll } from 'd3';
import { useEffect, useRef, useState } from 'react';
import { linksData } from "../../Data/Links";
import { nodesData } from "../../Data/Nodes";
import { Circles } from './Circles/Circles';
import { link, node, point } from './ForceDirectedGraph.types';
import { Links } from './Links/Links';

export const ForceDirectedGraph = () => {
    const [nodes, setNodes] = useState([...nodesData]);
    const [links, setLinks] = useState([...linksData]);
    const containerRef = useRef<SVGSVGElement | null>(null);

    let simulation: Simulation<SimulationNodeDatum, undefined> | undefined;

    useEffect(() => {
        simulatePositions();
        drawTicks();
    }, []);

    const restartDrag = () => {
        if (simulation) simulation.alphaTarget(0.2).restart()
    }

    const stopDrag = () => {
        if (simulation) simulation.alphaTarget(0)
    }

    const simulatePositions = () => {
        simulation = forceSimulation()
            .nodes(nodes as SimulationNodeDatum[])
            .force('link', forceLink(links)
                .id((d) => (d as node).name)
            )
            .force('charge', forceManyBody().strength(-300))
            .force('x', forceX())
            .force('y', forceY())
    }

    const drawTicks = () => {
        const svgNodes = selectAll('.node');
        const svgLinks = selectAll('.link');
        const svgLabels = selectAll('.label');

        if (simulation) {
            simulation.nodes(nodes as SimulationNodeDatum[]).on('tick', onTickHandler)
        }

        function onTickHandler() {
            svgLinks
                .attr('x1', (d) => {
                    return (d as { source: point }).source.x
                })
                .attr('y1', (d) => {
                    return (d as { source: point }).source.y
                })
                .attr('x2', (d) => {
                    return (d as { target: point }).target.x
                })
                .attr('y2', (d) => {
                    return (d as { target: point }).target.y
                })
            svgNodes
                .attr('cx', (d) => {
                    return (d as point).x
                })
                .attr('cy', (d) => {
                    return (d as point).y
                })
            svgLabels
                .attr("transform", (d) => "translate(" + [(d as point).x, (d as point).y] + ")");
        }
    }
    const width = 640;
    const height = 480;

    return (
        <div className='force-directed-graph-container'>
            <svg className="container"
                x={0}
                y={0}
                width={width}
                height={height}
                ref={containerRef}
                viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
            >
                <Links links={links as link[]} />
                <Circles
                    height={height}
                    width={width}
                    nodes={nodes as node[]}
                    restartDrag={restartDrag}
                    stopDrag={stopDrag} />
            </svg>
            <div className='tooltip' />
        </div>
    )
}