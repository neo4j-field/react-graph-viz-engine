import React from "react";
import { AboutPage } from "./About";

/**
 * Configuration for the info page
 */
 export default {
    title: 'About',
    component: AboutPage,
    parameters: { options: { showPanel: false } }
 };

 export const Introduction = () => <AboutPage></AboutPage>;