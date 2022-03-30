# react-graph-viz-engine
React component for visualizing graph data

Live example connected to GraphQL : https://react-graph-viz-engine.s3.us-west-1.amazonaws.com/index.html

## Embedded visualization libraries
* cytoscape.js

## Expected data format
The data format expected by the component is a JSON object and is based on the GraphQL response format sent by the Neo4j GraphQL library.
[See example here](https://neo4j.com/developer/graphql/#_querying_data)

## Config object
The config object is a JSON in the following format :

Format :
```json
config: {
    configPropertyKey1:{
        nodeLabel1: "propertyValue1"
        nodeLabel2: "propertyValue2"
    }
}
```

Example :
```json
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
```

## Interactions / event handling