import React from 'react';
import { jsxDecorator } from "storybook-addon-jsx";
import Graph from './Graph';


const SAMPLE_DATA =
{
   "data": {
      "actors": [
         {
            "__typename": "Actor",
            "ID": 1,
            "name": "François Lallement",
            "acted_in": [
               {
                  "__typename": "Movie",
                  "ID": 3,
                  "title": "Trip to the Moon, A (Voyage dans la lune, Le)",
                  "genres": [
                     {
                        "__typename": "Genre",
                        "ID": 5,
                        "name": "Action"
                     },
                     {
                        "__typename": "Genre",
                        "ID": 6,
                        "name": "Adventure"
                     }
                  ]
               }
            ]
         },
         {
            "__typename": "Actor",
            "ID": 2,
            "name": "Jules-Eugène Legris",
            "acted_in": [
               {
                  "__typename": "Movie",
                  "ID": 3,
                  "title": "Trip to the Moon, A (Voyage dans la lune, Le)",
                  "genres": [
                     {
                        "__typename": "Genre",
                        "ID": 7,
                        "name": "Sci-Fi"
                     }
                  ]
               }
            ]
         }
      ]
   }
};

/**
 * Configuration for all the graph visualization stories in the storybook.
 */
export default {
   title: 'Examples',
   component: Graph,
   decorators: [jsxDecorator],
   argTypes: {
      layout: {
         options: ['euler', 'grid'],
         control: { type: 'select' },
      },
   },
};

//👇 We create a “template” of how args map to rendering different variations of the visualization.
const Template = (args) => <Graph {...args} />;

/**
 * 
 */
export const DummyDataSimple = Template.bind({});
DummyDataSimple.args = {
   showNavigator: true,
   layout: 'euler',
   data: SAMPLE_DATA
};

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
      nodeCaption: {
         Movie: "title",
         Actor: "name",
         Genre: "name"
      },
      nodeColor: {
         Movie: "red",
         Actor: "blue",
         Genre: "green"
      },
      nodeSize: {
         Movie: 40,
         Actor: 20,
         Genre: 30
      },
      nodeCaptionSize: {
         Movie: 15,
         Actor: 15,
         Genre: 15
      }
   }
};
