import React, { useState } from 'react';
import './Graph.css';
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';

import "cytoscape-navigator/cytoscape.js-navigator.css";
import { parseData } from '../../util/parser/parser';
import { formatData } from '../../util/formatter/cytoscape';
import { fetchGraphQLDataJSON } from '../../util/data/fetch' 
import { layoutSettings, navigatorSettings } from './GraphConfig';


var navigator = require('cytoscape-navigator');

const GraphVisualization = ({ data = undefined,
                              layout = 'euler',
                              config = {},
                              showNavigator = false,
                              graphqlUrl,
                              graphqlQuery }) => {
    const [ref, setRef] = useState(undefined);

    if (ref) {

        var cy = cytoscape({
            container: ref,
            style: getStyle()
        });

        cytoscape.use(euler);
        if(data === undefined) {
            fetchGraphQLDataJSON(graphqlUrl, graphqlQuery).then(_data => {
                var parsedData = parseData(_data);
                var formattedData = formatData(parsedData);
                var eles = cy.add(formattedData);
                cy.layout({ ...layoutSettings, name: layout }).run();
            });
        } else {
            var parsedData = parseData(data);
            var formattedData = formatData(parsedData);
            var eles = cy.add(formattedData);
            cy.layout({ ...layoutSettings, name: layout }).run();
        }

        /**
         * Handles rendering the navigator window on the bottom right of the screen.
         */
        if (showNavigator) {
            cytoscape.use(navigator);
            let nav = cy.navigator(navigatorSettings); // get navigator instance, nav
        } else {
            const div = document.getElementById("navigator");
            if (div) {
                div.innerHTML = '';
            }
        }


    }

    return <div style={{ width: "100%", height: "500px" }}>
        <div style={{ width: 300, height: 200, position: 'absolute', right: 0, bottom: 0, overflow: 'hidden' }} id="navigator"></div>
        <div id="cy" ref={(cyRef) => { setRef(cyRef); }} style={{ width: "100%", height: "100%" }}> </div>
    </div>
}

export default GraphVisualization;

function getStyle() {
    return [
        {
            selector: 'node',
            style: {
                'label': 'data(id)'
            }
        },
        {
            selector: ".center-center",
            style: {
                "background": "black",
                "text-valign": "center",
                "text-halign": "center"
            }
        }
    ];
}

