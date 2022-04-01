import { GraphNode, GraphEdge } from "../../../util/parser";

/**
 * Formats our generic graph data representation into the format Cytoscape expects.
 */
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
    // Deduplicate node array based on ID's
    elements["nodes"] = elements["nodes"].filter((v, i, a) => a.findIndex(v2 => (v2.data.id === v.data.id)) === i)
    return elements
}