import { GraphNode, GraphEdge } from "../parser/parser";

export function formatData(data: [GraphNode[], GraphEdge[]]): object {
    var [nodes, edges] = data
    var elements = {
        elements: {
            nodes: [],
            edges: []
        }
    }
    nodes.forEach(function (node) {
        var element = { ...node, ...node["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["elements"]["nodes"].push({ data: element })
    });
    edges.forEach(function (edge) {
        var element = { ...edge, ...edge["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["elements"]["edges"].push({ data: element })
    });
    console.log(elements)
    return elements
}