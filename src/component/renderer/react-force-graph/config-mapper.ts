const NODE_SIZE_MULTIPLIER = 0.2;


function getOrDeriveValue(node, value){
    if (value instanceof Function) {
        return value(node);
    } 
    return value;
}

/**
 * For react-force-graph, assign styling properties directly to the elements to draw.
 */
export function mapConfig(config: object, elements: Array<object>) {
    elements['nodes'] = elements['nodes'].map(node => {
        const nodeColor = config && config['nodeColor'] && config['nodeColor'][node.label] ? getOrDeriveValue(node, config['nodeColor'][node.label]) : "#aaa";
        const nodeSize = config && config['nodeSize'] && config['nodeSize'][node.label] ? getOrDeriveValue(node, config['nodeSize'][node.label]) * NODE_SIZE_MULTIPLIER : 4;
        return { ...node, color: nodeColor, size: nodeSize }
    });
    return elements;
}
