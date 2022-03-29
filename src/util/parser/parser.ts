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

function parseNodesFromDict(dict: object): GraphNode {
    // Return node
    var node = new GraphNode();
    var _properties = {};
    if ("ID" in dict && dict["ID"] != null) {
        node.id = dict["ID"];
    } else {
        node.id = JSON.stringify(dict);
    }
    if ("__typename" in dict && dict["__typename"] != null) {
        node.label = dict["__typename"]
    }
    for (var [_key, _value] of Object.entries(dict)) {
        if (_value != null) {
            // Nested object or list of objects = relationship traversal
            if (Array.isArray(_value) && _value.every(isObj)) {
                _value.forEach(function (nestedObject) {
                    // Parse node (recursively)
                    console.log("Parsing : " + _key);
                    var _node = parseNodesFromDict(nestedObject);
                    nodes.push(_node);
                    // Add relationship, with source and target id
                    edges.push(new GraphEdge(uuidv4(), node.id, _node.id));
                });
            }
            else if (typeof _value === 'object' && !Array.isArray(_value)) {
                // TODO = Exclude non-nested objects like date/datetime
                // Parse node and add it to nodes
                var _node = parseNodesFromDict(_value);
                nodes.push(_node);
                // Add relationship, with source and target id
                edges.push(new GraphEdge(uuidv4(), node.id, _node.id));
            }
            // Node property
            else {
                if (_key != "ID" && _key != "__typename") {
                    _properties[_key] = _value;
                }
            }
        }
    }
    node.properties = _properties;
    return node;
}

export function parseData(data: object): [GraphNode[], GraphEdge[]] {
    nodes = Array<GraphNode>();
    edges = Array<GraphEdge>();

    // Iterate first level - These are nodes
    for (var [key, value] of Object.entries(data["data"])) {
        console.log("Parsing : " + key);
        // Iterate over the top-level nodes
        // @ts-ignore
        value.forEach(function (dict: object) {
            parseNodesFromDict(dict);
        });
    }
    console.log(nodes)
    return [nodes, edges];
}