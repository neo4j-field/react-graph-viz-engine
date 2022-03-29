import React from 'react';

import { jsxDecorator } from "storybook-addon-jsx";
import Graph from './Graph';

const ELEMENTS =
   {
      "data": {
        "movies": [
          {
            "__typename": "Movie",
            "ID": 1,
            "title": "Band of Brothers",
            "actors": [
              {
                "__typename": "Actor",
                "ID": 2,
                "name": "Scott Grimes",
                "born": null
              },
              {
                "__typename": "Actor",
                "ID": 3,
                "name": "Ron Livingston",
                "born": "1967-06-05",
                "pets": [
                    {
                      "__typename": "Horse",
                    "ID": 4,
                    "name": "Little Thunder"
                  }
                ] 
              }
            ]
          }
        ]
      }
    }
;

const ELEMENTS_SECONDARY = [
   { data: { id: 'one', label: 'Node 1' ,  classes: 'center-center' } },
   { data: { id: 'two', label: 'Node 2' } },
   { data: { id: 'three', label: 'Node 3' } },
   { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
   { data: { source: 'three', target: 'two', label: 'Edge from Node3 to Node2' } }
];

export default {
   title: 'Graph',
   component: Graph,
   decorators: [jsxDecorator],
   argTypes: {
      layout: {
        options: ['euler', 'grid'],
        control: { type: 'select' },
      },
    },
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Graph {...args} />;


//👇 Each story then reuses that template
export const LiveGraphQL = Template.bind({});
LiveGraphQL.args = {
   showNavigator: false,
   layout: 'euler',
   graphqlUrl: "https://movies.neo4j-graphql.com/",
   graphqlQuery:
   `{
      actors(options: {limit: 20}) {
        __typename
        name
        acted_in {
          __typename
          title
          genres {
            __typename
            name
          }
        }
      }
   }`,
   config: {
      nodeCaption:{
         Movie: "title",
         Actor: "name",
         Genre: "name"
      },
      nodeColor:{
         Movie: "red",
         Actor: "blue",
         Genre: "green"
      },
      nodeSize:{
         Movie: 40,
         Actor: 20,
         Genre: 30
      },
      nodeCaptionSize:{
         Movie: 15,
         Actor: 15,
         Genre: 15
      }
   }
};

export const DummyData = Template.bind({});
DummyData.args = {
   showNavigator: true,
   layout: 'euler',
   data: ELEMENTS 
};