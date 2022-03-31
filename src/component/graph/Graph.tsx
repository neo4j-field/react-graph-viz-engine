import React, { useState } from 'react';
import { CytoScapeRenderer } from '../renderer/cytoscape/renderer';
import { ReactForceGraphRenderer } from '../renderer/react-force-graph/renderer';



const GraphVisualization = ({
    renderer = "cytoscape",
    data = undefined,
    layout = 'euler',
    style = {},
    interactions = {},
    showNavigator = false,
    graphqlUrl,
    graphqlQuery }) => {

    // TODO: Do the retrieving and parsing of graphql queries here instead of in the renderer.
    switch (renderer) {
        case "cytoscape":
            return  <div style={{ height: "500px" }}>
                <CytoScapeRenderer
                    data={data}
                    layout={layout}
                    style={style}
                    interactions={interactions}
                    showNavigator={showNavigator}
                    graphqlUrl={graphqlUrl}
                    graphqlQuery={graphqlQuery}
                ></CytoScapeRenderer>
            </div>
        case "react-force-graph":
            return <div style={{ height: "500px" }}>
                <ReactForceGraphRenderer
                    data={data}
                    layout={layout}
                    style={style}
                    interactions={interactions}
                    showNavigator={showNavigator}
                    graphqlUrl={graphqlUrl}
                    graphqlQuery={graphqlQuery}
                ></ReactForceGraphRenderer></div>
        default:
            return <div>Invalid renderer specified.</div>
    }
}

export default GraphVisualization;
