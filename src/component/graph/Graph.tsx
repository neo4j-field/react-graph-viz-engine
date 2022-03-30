import React, { useState } from 'react';
import './Graph.css';
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';
import popper from 'cytoscape-popper';

import "cytoscape-navigator/cytoscape.js-navigator.css";
import { parseData } from '../../util/parser/parser';
import { formatData } from '../../util/formatter/cytoscape';
import { fetchGraphQLDataJSON } from '../../util/data/fetch' 
import { layoutSettings, navigatorSettings } from './GraphConfig';
import { mapConfig } from '../../util/configmapper/cytoscape';


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
            style: getStyle(config)
        });

        cytoscape.use(euler);
        cytoscape.use(popper);
        
        if(data === undefined) {
            fetchGraphQLDataJSON(graphqlUrl, graphqlQuery).then(_data => {
                var parsedData = parseData(_data);
                var formattedData = formatData(parsedData);
                var eles = cy.add(formattedData);
                cy.layout({ ...layoutSettings, name: layout }).run();
                cy.filter('node').forEach(t => {
                    bindPopper(t);
                })
            });
        } else {
            var parsedData = parseData(data);
            var formattedData = formatData(parsedData);
            var eles = cy.add(formattedData);
            cy.layout({ ...layoutSettings, name: layout }).run();
            cy.filter('node').forEach(t => {
                bindPopper(t);
            })
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

function getStyle(config: object) {
    return mapConfig(config);
}

/**
 *
 * @param target node or edge
 */
function bindPopper(target) {
    let tooltipId = `popper-target-${target.id()}`;
    let existingTarget = document.getElementById(tooltipId);
    if (existingTarget && existingTarget.length !== 0) {
        existingTarget.remove();
    }

    let popper = target.popper({
        content: () => {
            // create div container
            let tooltip = document.createElement('div');
            
            // adding id for easier JavaScript control
            tooltip.id = tooltipId;

            // adding class for easier CSS control
            tooltip.classList.add('target-popper');

            // create actual table
            let table = document.createElement('table');

            // append table to div container
            tooltip.append(table);
            let targetData = target.data();

            // loop through target data
            for (let prop in targetData) {
                if (prop == "id") continue;
                if (!targetData.hasOwnProperty(prop)) continue;

                let targetValue = targetData[prop];
                // no recursive or reduce support
                if (typeof targetValue === "object") continue;

                let tr = table.insertRow();

                let tdTitle = tr.insertCell();
                let tdValue = tr.insertCell();

                tdTitle.innerText = prop;
                tdValue.innerText = targetValue;
            }

            document.body.appendChild(tooltip);

            return tooltip;
        }
    });

    target.on('position', () => {
        popper.update();
    });

    target.cy().on('pan zoom resize', () => {
        popper.update();
    });

    target.on('mouseover', () => {
        if (document.getElementById(tooltipId)) {
            document.getElementById(tooltipId).classList.add('active');
        }
    }).on('mouseout', () => {
        if (document.getElementById(tooltipId)) {
            document.getElementById(tooltipId).classList.remove('active');
        }
    })
}