import React from 'react';

import { jsxDecorator } from "storybook-addon-jsx";
import Graph  from './Graph';

const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 200, y: 200 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 100 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
 ];

export default {
    title: 'Graph',
    component: Graph,
    decorators: [jsxDecorator]
  };
  
  //👇 We create a “template” of how args map to rendering
  const Template = (args) => <Graph {...args} />;
  

  //👇 Each story then reuses that template
  export const Primary = Template.bind({});
  Primary.args = {
     disabled: false,
     label: 'Graph 1',
     elements: elements
  };

  export const Secondary = Template.bind({});
  Primary.args = {
     disabled: false,
     label: 'Graph 2',
     elements: elements
  };