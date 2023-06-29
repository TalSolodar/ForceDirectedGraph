import { v4 as uuidv4 } from 'uuid';
import { node } from "../ForceDirectedGraph.types";
import { Label } from './Label/Label';

interface LabelsProps{
    nodes: node[]
}
export const Labels = ({nodes}: LabelsProps) => {
    return (
        <g className='labels'>
        {nodes.map(node=>(
            <Label node={node}  key={`label-${uuidv4()}`}/>
        ))}
    </g>
    )
}