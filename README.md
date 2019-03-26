# Adepto Hamsters

Hosted [here](https://app.hamster.hyperboa.com/).

## Background:
  Hamsters need to be able to share their thoughts and collaborate on new ideas. The platform allows users to make text
  posts comprising of a title and body, all posts are visible to all users, and all users can express thier
  interest in a post by liking it.
  
  This allows hamster society to determine the most important happenings within the community.
  
## Architectural overview:

### Infrastructure:

  The goal for the project was to be 100% serverless, so the api is collection of lambda functions relying on AWS [sam](https://github.com/awslabs/serverless-application-model) and the [sam-cli](https://github.com/awslabs/aws-sam-cli),
  the database is an autoscaling dynamoDB table and the frontend is served from a CDN.
    
  All resources used by this application are defined in cloudformation templates, the master stack can be found in the
  project's root while it's 2 nested stacks, `Infrastructure` and `Pipeline` are located in the `aws` folder.
  
  `Pipeline`
  
  This stack defines the resources concerned with continuous integration, primarily a CodePipeline resource, comprised of:
  1. Source - triggered when the specified repo/branch is pushed to, pulls the source and initiates the pipeline
  2. Build - tests the backend code, packages it using the AWS sam cli and translates the output template to cloudformation
  3. Deploy - first generates a changeset of all infrasctructure changes, then executes the changes if all is ok
  4. Frontend - tests and builds the react app using env variables generated and injected into config files in previous steps
  
  `Infrastructure`
  
  Defines all of the actual resources through nested stacks:
  - `Cognito` - authentication service
    
  - `Codebuild` - the containers and roles used in the build steps
    
  - `Storage` - s3 buckets to store templates and lambda function code, also frontend bundle/assets
  
  - `Database` - single dynamoDB table for user posts, simple hashKey, no indexes 
  
  - `FrontendDNS` - route53 and cloudfront, frontend is served from s3 via CDN
  
  - `ApiDns` - as previous, but for api gateway
  
  - `API` - lambda/api gateway resources
  
### Backend:

  Serverless API using Node.js 8.11, can be tested locally using the sam-cli (this is sometimes buggy, especially when using
  authorizers, which this project does - cognito. Still in beta though so to be expected).
  
  The functions are mostly very simple and some could be replaced by direct mappings between api gateway and dynamoDB.
  
  Uses mocha/chai for testing.

### Frontend:

  Simple create react app (almost no reason not to use CRA as of v2).
  
  Makes use of a small amount of redux with [redux-observables](https://redux-observable.js.org) and [rxjs](http://reactivex.io).
  
  AWS [Amplify](https://aws-amplify.github.io/docs/js/react) is used as the interface to AWS Cognito, the chosen authentication service.
  
  For styling both sass and [emotion](https://emotion.sh/docs/introduction), chosen over styled-components as slightly
  smaller, and apprently [faster](https://github.com/jsjoeio/styled-components-vs-emotion).
  Sass because css is faster than any css-in-js.
  
  Some use of the new react hooks api. Some functional components. Mostly class-based for now, ideally more hooks.
  
  Jest/Enzyme for testing.

## Unfinished:
  
  TESTING. Made attempts to show how testing should be gone about but very poor coverage.
  
  More control over timeline, sort by likes/timestamp/etc.
  
  Pagination of the timeline, first time working with dynamoDB so a few things had to be left out due to time constraints.
  
  Perhaps a friend system.
  
## Trade-offs:

  Serverless applications shine in terms of cost-effectiveness and ease of scalability, as they are able to take advantage
  of a full pay as you go model. Traditionally this has been offset by costs like developer time sunk into working with
  awkward dev environments, but being able to run lambda and api-gateway locally is a huge help.

  DynamoDB is quite awkward to work with when compared to many other noSQL databases, but the speed and ease of scaling help make up for it
