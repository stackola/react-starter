Reducers mutate the redux store. They are functions which take as arguments the old state and the action, and return the new state.

```
export const user = createReducer({username:"Willi"}, { //Define the default value of the object
	[types.SET_USER_OBJECT](state, action) { //which action to respond to
		return action.payload; //in this case, we return the entire payload as the new state
	}
}
```



In index.js we combine the seperate reducers to one big redux store.

In this case, our store looks like:

```
{
	user:{
		username:"Willi"
	}
}
```