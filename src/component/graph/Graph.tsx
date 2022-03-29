import React, { useState } from 'react';
import './Graph.css';
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';

import "cytoscape-navigator/cytoscape.js-navigator.css";

// Configuration for the graph navigator window on the bottom right of the screen.
let navigatorSettings = {
    container: "#navigator" // html dom element
  , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
  , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
  , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
  , dblClickDelay: 200 // milliseconds
  , removeCustomContainer: false // destroy the container specified by user on plugin destroy
  , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
};

let layoutSettings = {

    // The ideal length of a spring
    // - This acts as a hint for the edge length
    // - The edge length can be longer or shorter if the forces are set to extreme values
    springLength: edge => 80,
  
    // Hooke's law coefficient
    // - The value ranges on [0, 1]
    // - Lower values give looser springs
    // - Higher values give tighter springs
    springCoeff: edge => 0.0008,
  
    // The mass of the node in the physics simulation
    // - The mass affects the gravity node repulsion/attraction
    mass: node => 4,
  
    // Coulomb's law coefficient
    // - Makes the nodes repel each other for negative values
    // - Makes the nodes attract each other for positive values
    gravity: -1.2,
  
    // A force that pulls nodes towards the origin (0, 0)
    // Higher values keep the components less spread out
    pull: 0.001,
  
    // Theta coefficient from Barnes-Hut simulation
    // - Value ranges on [0, 1]
    // - Performance is better with smaller values
    // - Very small values may not create enough force to give a good result
    theta: 0.666,
  
    // Friction / drag coefficient to make the system stabilise over time
    dragCoeff: 0.02,
  
    // When the total of the squared position deltas is less than this value, the simulation ends
    movementThreshold: 1,
  
    // The amount of time passed per tick
    // - Larger values result in faster runtimes but might spread things out too far
    // - Smaller values produce more accurate results
    timeStep: 20,
  
    // The number of ticks per frame for animate:true
    // - A larger value reduces rendering cost but can be jerky
    // - A smaller value increases rendering cost but is smoother
    refresh: 10,
  
    // Whether to animate the layout
    // - true : Animate while the layout is running
    // - false : Just show the end result
    // - 'end' : Animate directly to the end result
    animate: false,
  
    // Animation duration used for animate:'end'
    animationDuration: undefined,
  
    // Easing for animate:'end'
    animationEasing: undefined,
  
    // Maximum iterations and time (in ms) before the layout will bail out
    // - A large value may allow for a better result
    // - A small value may make the layout end prematurely
    // - The layout may stop before this if it has settled
    maxIterations: 1000,
    maxSimulationTime: 4000,
  
    // Prevent the user grabbing nodes during the layout (usually with animate:true)
    ungrabifyWhileSimulating: false,
  
    // Whether to fit the viewport to the repositioned graph
    // true : Fits at end of layout for animate:false or animate:'end'; fits on each frame for animate:true
    fit: true,
  
    // Padding in rendered co-ordinates around the layout
    padding: 30,
  
    // Constrain layout bounds with one of
    // - { x1, y1, x2, y2 }
    // - { x1, y1, w, h }
    // - undefined / null : Unconstrained
    boundingBox: undefined,
  
    // Layout event callbacks; equivalent to `layout.one('layoutready', callback)` for example
    ready: function(){}, // on layoutready
    stop: function(){}, // on layoutstop
  
    // Whether to randomize the initial positions of the nodes
    // true : Use random positions within the bounding box
    // false : Use the current node positions as the initial positions
    randomize: true
  };
  


var navigator = require('cytoscape-navigator');

const GraphVisualization = ({ elements = [], layout = 'euler', showNavigator = false }) => {
    const [ref, setRef] = useState(undefined);

    if(ref){

        var cy = cytoscape({ container: ref,
            
            style: [
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
              ] });
              

        cytoscape.use( euler );
        var eles = cy.add(elements);  
        cy.layout( {...layoutSettings, name: layout}).run();  

        /**
         * Handles rendering the navigator window on the bottom right of the screen.
         */
        if(showNavigator){
            cytoscape.use(navigator);
            let nav = cy.navigator( navigatorSettings ); // get navigator instance, nav
        }else{
            const div = document.getElementById("navigator");
            if(div){
                div.innerHTML = '';
            }
        }

      
    }

    return <div style={{ width: "100%", height: "500px" }}>
        <div style={{width: 300, height: 200, position: 'absolute', right: 0, bottom: 0, overflow: 'hidden'}}id="navigator"></div>
      <div id="cy" ref={(cyRef) => { setRef(cyRef); }} style={{ width: "100%", height: "100%" }}> </div>
     </div>
}

export default GraphVisualization;
