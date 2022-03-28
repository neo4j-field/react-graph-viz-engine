import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './Graph.css';

const GraphVisualization = ({ elements = [], disabled = false }) => {

    return <>
    <p> I am a title </p>
    <CytoscapeComponent elements={elements} style={{ width: '1000px', height: '600px' }} />;
    </>
}

export default GraphVisualization;