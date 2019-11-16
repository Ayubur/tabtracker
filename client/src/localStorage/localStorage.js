//Loading state

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 


  //Saving state

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
      console.error("Error in saving state from localStorage to redux");
    }
  };