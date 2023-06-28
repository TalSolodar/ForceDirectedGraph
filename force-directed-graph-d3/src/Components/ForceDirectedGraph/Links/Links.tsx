
import { v4 as uuidv4 } from 'uuid';
import { Link } from './Link/Link';
import { link } from '../ForceDirectedGraph.types';

interface LinksProps {
    links: link[]
}

export const Links = ({links}: LinksProps) => {
    return (
        <g className='links'>
            {links.map(link=>(
                <Link link={link}  key={`link-${uuidv4()}`}/>
            ))}
        </g>
    )
}