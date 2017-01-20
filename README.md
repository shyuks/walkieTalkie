- Profile Creation
- Matching with other profiles in location based
- Creating chat room based on similiar interests
- Adding other users to chat room
- Being able to create individual chat rooms with other users.

# MVP
- Interest based rooms (matched based on settings upon setup/interests)

# /App
- Everything React goes in here
    - actions: Functionality of specific component
    - components: Render component view using actions, stores functionality
    - stores: State and props stored here with functionality

# /core
- Back-end data functionality handlers go in here
    - controllers: Data functionality per specific model
    - models: Rules and definitions of data models
    - routes: Control flow of making endpoint requests

# /db
- Schemas, Migrations go in here
    - schema: Define data schemas
    - seed file: Import and export fake data

# /public
- Compiled files, api keys, views goes here
    - build: Compiled files from webpack
    - keys: Api keys (private)
    - views: Render components from <App/>

# /test
- Testing files goes here.
