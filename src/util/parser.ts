import {v4 as uuidv4} from 'uuid';

var isObj = function (obj) {
    return typeof obj === 'object';
}

export class GraphNode {
    id: string = "";
    label: string = "Node";
    properties?: object = {};
}

export class GraphEdge {
    id: string = "";
    source: string = "";
    target: string = "";
    type: string = "Edge";
    properties?: object = {};

    constructor(id: string, source: string, target: string) {
        this.id = id;
        this.source = source;
        this.target = target;
    }
}

var nodes: Array<GraphNode>;
var edges: Array<GraphEdge>;

function parseNodesFromDict(dict: object, schema: object): GraphNode {

    console.log(schema); 
    // Return node
    var node = new GraphNode();
    var _properties = {};
    
    const labelField = schema && schema["nodeLabelField"] ? schema["nodeLabelField"] : "__typename";

    if (labelField in dict && dict[labelField] != null) {
        node.label = dict[labelField]
    }
    const idField = schema && schema["nodeIdField"] ? schema["nodeIdField"] : "ID";
    if (idField in dict && dict[idField] != null) {
        node.id = dict[idField];
    } else {
        node.id = JSON.stringify(dict);
    }

    for (var [_key, _value] of Object.entries(dict)) {
        if (_value != null) {
            // Nested object or list of objects = relationship traversal
            if (Array.isArray(_value) && _value.every(isObj)) {
                _value.forEach(function (nestedObject) {
                    // Parse node (recursively)
                    var _node = parseNodesFromDict(nestedObject, schema);
                    // Add relationship, with source and target id
                    edges.push(new GraphEdge(uuidv4(), node.id, _node.id));
                });
            }
            else if (typeof _value === 'object' && !Array.isArray(_value)) {
                // TODO = Exclude non-nested objects like date/datetime
                // Parse node and add it to nodes
                var _node = parseNodesFromDict(_value, schema);
                // Add relationship, with source and target id
                edges.push(new GraphEdge(uuidv4(), node.id, _node.id));
            }
            // Node property
            else {
                if (_key != idField && _key != labelField) {
                    _properties[_key] = _value;
                }
            }
        }
    }
    node.properties = _properties;
    nodes.push(node);
    return node;
}

export function parseData(data: object, schema: object): [GraphNode[], GraphEdge[]] {
    nodes = Array<GraphNode>();
    edges = Array<GraphEdge>();

    // Iterate first level - These are nodes
    for (var [key, value] of Object.entries(data["data"])) {
        // Iterate over the top-level nodes
        // @ts-ignore
        value.forEach(function (dict: object) {
            parseNodesFromDict(dict, schema);
        });
    }
    return [nodes, edges];
}