import React, { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './Graph.css';
import cytoscape from 'cytoscape';
import "cytoscape-navigator/cytoscape.js-navigator.css";

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
        console.log(ref)
        navigator( cytoscape ); // register extension
        var cy = cytoscape({
            container: ref // container to render in
          });
        var eles = cy.add([
        { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
        { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
        { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
        ]);    
        var nav = cy.navigator( defaults ); // get navigator instance, nav
    }

    return <div style={{ width: "100%", height: "500px" }}>
        <p> I am a title {disabled} </p>
      <div id="cy" ref={(cyRef) => { setRef(cyRef); }} style={{ width: "100%", height: "300px" }}> </div>
     </div>
}

export default GraphVisualization;
