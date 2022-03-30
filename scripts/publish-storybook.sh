yarn build-storybook
aws s3 rm s3://react-graph-viz-engine --recursive
aws s3 sync storybook-static s3://react-graph-viz-engine --acl public-read
