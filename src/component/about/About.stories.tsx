import React from "react";
import { AboutPage } from "./About";
import About from "./About.mdx";
/**
 * Configuration for the info page
 */
 export default {
    title: 'About',
    parameters: {
        options: { showPanel: false },
        docs: {
          page: About,
        },
      }
 };

 export const Introduction = () => <About></About>;