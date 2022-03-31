import React from "react";
import About from "./About.mdx";
/**
 * Configuration for the info page
 */
 export default {
    title: 'About',
    parameters: {
      viewMode: 'docs',
      previewTabs: { 
        canvas: { hidden: true } 
       },
      docs: { page: About }
    }
 };

 export const Introduction = () => <div></div>;