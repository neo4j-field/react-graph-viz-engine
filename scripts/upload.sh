yarn build

aws s3 rm s3://react-graph-viz-engine --recursive
aws s3 sync dist s3://react-graph-viz-engine --acl public-read
