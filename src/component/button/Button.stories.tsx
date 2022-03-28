
import React from 'react';
import { jsxDecorator } from "storybook-addon-jsx";
import Button  from './Button';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Button',
    component: Button,
    decorators: [jsxDecorator]
  };
  
  //👇 We create a “template” of how args map to rendering
  const Template = (args) => <Button {...args} />;
  

  //👇 Each story then reuses that template
  export const Primary = Template.bind({});
  Primary.args = {
     disabled: false,
     label: 'Button',
  };

  export const Secondary = Template.bind({});
  Primary.args = {
     disabled: false,
     label: 'data',
  };