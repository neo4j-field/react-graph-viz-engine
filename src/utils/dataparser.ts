var isObj = function (obj) {
    return typeof obj === 'object';
}

var nodes = []
var edges = []

class Node {
    id: number;
    label: string;
    properties: object;
}

class Edge {
    source: number;
    target: number;
    type: string;
    properties: object;
}

function parseNodeFromDict(dict: object): Node {
    // Return node
    var node = new Node();
    var _properties = {};
    if ("ID" in dict && dict.ID != null) {
        node.id = dict.ID;
    }
    else {
        // TODO : Create arbitrary ID
    }
    if ("__typename" in dict && dict.__typename != null) {
        node.label = dict.__typename
    }
    for (var [_key, _value] of Object.entries(dict)) {
        if (_value != null) {
            // Nested object or list of objects = relationship traversal
            if (Array.isArray(_value) && _value.every(isObj)) {
                _value.forEach(function (nestedObject) {
                    // Parse node (recursively)
                    console.log("Parsing : " + _key);
                    _node = parseNodeFromDict(nestedObject);
                    // Add relationship, with source and target id
                    edges.push(Edge = {
                        source: node.id,
                        target: _node.id
                    });
                });
            }
            else if (typeof _value === 'object' && !Array.isArray(_value)) {
                // TODO = Exclude non-nested objects like date/datetime
                // Parse node and add it to nodes
                _node = parseNodeFromDict(_value);
                // Add relationship, with source and target id
                edges.push(Edge = {
                    source: node.id,
                    target: _node.id
                });
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
    nodes.push(node);
    return node;
}

// Iterate first level - These are nodes
for (var [key, value] of Object.entries(example_data.data)) {
    console.log("Parsing : " + key);
    // Iterate over the top-level nodes
    value.forEach(function (dict) {
        // Parse node (recursively)
        // Push node to the list of nodes
        // Add relationship, with source and target id
        node = parseNodeFromDict(dict);
    });
}
var elements = {
    elements: {
        nodes: nodes,
        edges: edges
    }
}