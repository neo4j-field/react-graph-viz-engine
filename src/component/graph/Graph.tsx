import React, { useState } from 'react';
import './Graph.css';
import cytoscape from 'cytoscape';
import "cytoscape-navigator/cytoscape.js-navigator.css";

// Configuration for the graph navigator window on the bottom right of the screen.
var defaults = {
    container: false // html dom element
  , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
  , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
  , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
  , dblClickDelay: 200 // milliseconds
  , removeCustomContainer: false // destroy the container specified by user on plugin destroy
  , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
};

var navigator = require('cytoscape-navigator');

const GraphVisualization = ({ elements = [], disabled = false }) => {
    const [ref, setRef] = useState(undefined);

    if(ref){
        navigator( cytoscape ); // register extension
        var cy = cytoscape({ container: ref });
        var eles = cy.add(elements);    
        var nav = cy.navigator( defaults ); // get navigator instance, nav
    }

    return <div style={{ width: "100%", height: "500px" }}>
      <div id="cy" ref={(cyRef) => { setRef(cyRef); }} style={{ width: "100%", height: "100%" }}> </div>
     </div>
}

export default GraphVisualization;
