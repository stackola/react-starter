This folder contains the config for the actions that can be invoked in the redux store.

Thats the only way to manipulate the store.

OldStore -> Action(payload) -> NewStore

Actiontypes ('Blueprints') have to be defined in types.js

We then make them available as simple functions, that return the appropriate redux action. (Check user.js)

Instead of having to write `dispatch({type:'SET_USERNAME', payload:'Willi'})`, we can just call `setUsername('Willi')`.