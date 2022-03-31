import {defaultArgs, defaultConfig, Template} from './defaults';

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

const GRAPHQL_URL = "https://movies.neo4j-graphql.com/"
const GRAPHQL_QUERY = `{
   actors(options: {limit: 20}) {
     __typename
     name
     acted_in {
       __typename
       title
       released
       genres {
         __typename
         name
       }
     }
   }
}`

export default {
   title: 'Usage',
   ...defaultConfig
};

export const SimpleData = Template.bind({});
SimpleData.args = {
   ...defaultArgs,
   showNavigator: true,
   data: SAMPLE_DATA
};

export const LiveGraphQLData = Template.bind({});
LiveGraphQLData.args = {
   ...defaultArgs,
   showNavigator: false,
   graphqlUrl: GRAPHQL_URL,
   graphqlQuery:GRAPHQL_QUERY,
   style: {
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
         Movie: (movie) => {
            if(movie.released){
               return movie.released.split('-')[0] - 1900
            }else{
               return 40;
            }
         },
         Actor: 20,
         Genre: 30
      },
      nodeCaptionSize: {
         Movie: 15,
         Actor: 15,
         Genre: 15
      }
   },
   interactions: {
      onNodeClick: (e) => alert(e.name),
      onNodeDoubleClick: (e) => {
         // call graphql
         // update node set
         // ...
      }
   }
};
