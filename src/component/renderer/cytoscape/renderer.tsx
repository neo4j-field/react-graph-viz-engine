import React, { useState } from "react";
import { layoutSettings, navigatorSettings } from "./config";
import { fetchGraphQLDataJSON } from "../../../util/fetch";
import { formatData } from "./formatter";
import { parseData } from "../../../util/parser";
import './style.css';
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';
import popper from 'cytoscape-popper';
import dagre from 'cytoscape-dagre';

import "cytoscape-navigator/cytoscape.js-navigator.css";
import { mapConfig } from "./config-mapper";
import useDimensions from "react-cool-dimensions";
import { LAYOUT_NAMES } from "./config";
var navigator = require('cytoscape-navigator');

export const CytoScapeRenderer = ({ data = undefined,
    layout = 'graph',
    style = {},
    interactions = {},
    showNavigator = false,
    graphqlUrl,
    graphqlQuery }) => {

    const [ref, setRef] = useState(undefined);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { observe, unobserve, width, height, entry } = useDimensions({
        onResize: ({ observe, unobserve, width, height, entry }) => {
            // Triggered whenever the size of the target is changed...
            unobserve(); // To stop observing the current target element
            observe(); // To re-start observing the current target element
        },
    });

    if (ref) {

        var cy = cytoscape({
            container: ref,
            style: getStyle(style)
        });

        cytoscape.use(euler);
        cytoscape.use(dagre);
        cytoscape.use(popper);

        if (data === undefined && graphqlQuery !== undefined && graphqlUrl !== undefined) {
            fetchGraphQLDataJSON(graphqlUrl, graphqlQuery).then(_data => {
                setDataLoaded(true);
                var parsedData = parseData(_data);
                var formattedData = formatData(parsedData);
                var eles = cy.add(formattedData);
                cy.layout({ ...layoutSettings, name: LAYOUT_NAMES[layout] }).run();
                cy.filter('node').forEach(t => {
                    bindPopper(t);
                })
            });
        } else {
            if (dataLoaded == false) {
                setDataLoaded(true);
            }
            var parsedData = parseData(data);
            var formattedData = formatData(parsedData);
            var eles = cy.add(formattedData);
            cy.layout({ ...layoutSettings, name: LAYOUT_NAMES[layout] }).run();
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

        //
        cy.on("click", "node", e => interactions && interactions.onNodeClick && interactions.onNodeClick(e.target._private.data));
        cy.on("cxttap", "node", e => interactions && interactions.onNodeRightClick && interactions.onNodeRightClick(e.target._private.data));

    }

    return <>
        <div style={{ width: 300, height: 200, position: 'absolute', right: 0, bottom: 0, overflow: 'hidden' }} id="navigator" > </div>
        {!dataLoaded ? <div>Loading...</div> : <></>}
        <div id="cy" ref={(cyRef) => { setRef(cyRef); }} style={{ width: "100%", height: "100%" }}> </div>
    </>
}


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