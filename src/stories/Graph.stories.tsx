import { defaultArgs, defaultConfig, Template } from './defaults';

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


const SAMPLE_DATA_CUSTOM_LABELS = {
   "data": {
     "movies": [
       {
         "mylabel": "Movie",
         "title": "Toy Story",
         "released": "1995-11-22",
         "genres": [
           {
             "mylabel": "Genre",
             "name": "Adventure"
           }
         ]
       },
       {
         "mylabel": "Movie",
         "title": "Jumanji",
         "released": "1995-12-15",
         "genres": [
           {
             "mylabel": "Genre",
             "name": "Adventure"
           }
         ]
       },
       {
         "mylabel": "Movie",
         "title": "Grumpier Old Men",
         "released": "1995-12-22",
         "genres": [
           {
             "mylabel": "Genre",
             "name": "Comedy"
           }
         ]
       },
       {
         "mylabel": "Movie",
         "title": "Waiting to Exhale",
         "released": "1995-12-22",
         "genres": [
           {
             "mylabel": "Genre",
             "name": "Romance"
           }
         ]
       },
       {
         "mylabel": "Movie",
         "title": "Father of the Bride Part II",
         "released": "1995-12-08",
         "genres": [
           {
             "mylabel": "Genre",
             "name": "Comedy"
           }
         ]
       }
     ]
   }
 }

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
   title: 'Examples',
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
   renderer: "react-force-graph",
   graphqlUrl: GRAPHQL_URL,
   graphqlQuery: GRAPHQL_QUERY
};

export const SimpleStyling = Template.bind({});
SimpleStyling.args = {
   ...defaultArgs,
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
         Movie: 40,
         Actor: 20,
         Genre: 30
      },
      nodeCaptionSize: {
         Movie: 15,
         Actor: 15,
         Genre: 15
      }
   },
   showNavigator: true,
   graphqlUrl: GRAPHQL_URL,
   graphqlQuery: GRAPHQL_QUERY
};

export const RuleBasedStyling = Template.bind({});
RuleBasedStyling.args = {
   ...defaultArgs,
   style: {
      nodeCaption: {
         Movie: "title",
         Actor: "name",
         Genre: "name"
      },
      nodeColor: {
         Movie: "green",
         Actor: "orange",
         Genre: "blue"
      },
      nodeSize: {
         Movie: (movie) => {
            if (movie.released) {
               return movie.released.split('-')[0] - 1900
            } else {
               return 40;
            }
         },
         Actor: 15,
         Genre: 15
      }
   },
   showNavigator: false,
   graphqlUrl: GRAPHQL_URL,
   renderer: "react-force-graph",
   graphqlQuery: GRAPHQL_QUERY
};

export const TreeLayout = Template.bind({});
TreeLayout.args = {
   ...defaultArgs,
   interactions: {

      onNodeClick: (e) => alert(e.name ? e.name : e.title),
      onNodeRightClick: (e) => alert('right click')
   },
   showNavigator: false,
   layout: "tree",
   style: {
      nodeColor: {
         Movie: "green",
         Actor: "green",
         Genre: "green"
      },
      nodeCaptionSize: {
         Movie: 6,
         Actor: 15,
         Genre: 15
      }
   },
   graphqlUrl: GRAPHQL_URL,
   graphqlQuery: GRAPHQL_QUERY,
};

export const Interactions = Template.bind({});
Interactions.args = {
   ...defaultArgs,
   interactions: {

      onNodeClick: (e) => alert(e.name ? e.name : e.title),
      onNodeRightClick: (e) => alert('right click')
   },
   showNavigator: false,
   graphqlUrl: GRAPHQL_URL,
   graphqlQuery: GRAPHQL_QUERY,
};

export const CustomSchema = Template.bind({});
CustomSchema.args = {
   ...defaultArgs,
   schema: {
      nodeLabelField: "mylabel",
      nodeIdField: {
         Movie: "title",
         Genre: "name"
      },
   },
   style: {
      nodeColor: {
         Movie: "orange",
         Genre: (genre) => { return genre.name == "Adventure" ? "green" : "purple"}
      },
   },
   showNavigator: false,
   data: SAMPLE_DATA_CUSTOM_LABELS
};