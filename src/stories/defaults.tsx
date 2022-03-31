import React from 'react';
import Graph from '../component/graph/Graph';
import { jsxDecorator } from "storybook-addon-jsx";
import UsageDocs from './Graph.mdx';

/**
 * Configuration for all the graph visualization stories in the storybook.
 */
export const defaultConfig = {
    component: Graph,
    parameters: {
        options: {
            showPanel: true
        },
        docs: {
            page: UsageDocs
        }
    },
    decorators: [jsxDecorator],
    argTypes: {
        layout: {
            options: ['euler', 'grid'],
            control: { type: 'select' },
        },
        renderer: {
            options: ['cytoscape', 'react-force-graph'],
            control: { type: 'select' },
        },
    },
};

export const defaultArgs = {
    renderer: 'cytoscape',
    layout: 'euler'
}

//👇 We create a “template” of how args map to rendering different variations of the visualization.
export const Template = (args) => <Graph {...args} />;