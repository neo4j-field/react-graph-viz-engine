import { GraphNode, GraphEdge } from "../parser/parser";

/**
 * Formats our generic graph data into a format that react-force-graph
 */
export function formatData(data: [GraphNode[], GraphEdge[]]): object {
    var [nodes, edges] = data
    var elements = {
        nodes: [],
        links: []
    }
    nodes.forEach(function (node) {
        var element = { ...node, ...node["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["nodes"].push({ ...element, color: '#aaa' })
    });
    edges.forEach(function (edge) {
        var element = { ...edge, ...edge["properties"] }
        delete element["properties"]
        //@ts-ignore
        elements["links"].push(element)
    });

    // Deduplicate node array based on ID's
    elements["nodes"] = elements["nodes"].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    return elements
}