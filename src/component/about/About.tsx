
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Render the markdown from the README as the introduction page.
 */
export const AboutPage = () => {
    const [markdown, setMarkdown] = React.useState("");
    fetch("https://raw.githubusercontent.com/neo4j-field/react-graph-viz-engine/main/README.md").then(response =>
        response.text().then(text => {
            setMarkdown(text);
        })
    );
    return <div style={{fontFamily: "arial"}}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
} 
