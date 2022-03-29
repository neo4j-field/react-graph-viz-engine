import { GraphNode, GraphEdge } from "../parser/parser";

export function formatData(data: [GraphNode[], GraphEdge[]]): object {
    var [nodes, edges] = data
    var elements = {
        nodes: [],
        edges: []
    }
    nodes.forEach(function (node) {
        var element = { ...node, ...node["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["nodes"].push({ data: element, classes: "center-center" })
    });
    edges.forEach(function (edge) {
        var element = { ...edge, ...edge["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["edges"].push({ data: element })
    });
    return elements
}