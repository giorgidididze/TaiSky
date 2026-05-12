export const loadState = (key) => {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) : undefined;
    } catch (e) {
      console.error("LOAD STATE ERROR:", e);
      return undefined;
    }
  };
  
  export const saveState = (key, state) => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error("SAVE STATE ERROR:", e);
    }
  };