interface SomeState {
  data: any[]; // You can replace `any` with a more specific type if you know what kind of data you're working with
}

interface SomeAction {
  type: string; // You can be more specific if you have known action types
  payload?: any; // You can replace `any` with a more specific type if needed
}

const initialState: SomeState = {
  data: [],
};

function someReducer(
  state: SomeState = initialState,
  action: SomeAction
): SomeState {
  switch (action.type) {
    // Handle actions
    default:
      return state;
  }
}

export default someReducer;
