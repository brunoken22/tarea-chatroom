const state = {
   data: {
      tasks: [
         { id: 1, title: "primer item", completed: false },
         { id: 2, title: "segundo item", completed: true },
         { id: 3, title: "tercer item", delete: true },
         { id: 4, title: "cuarto item", completed: false },
      ],
   },
   listeners: [],
   init() {
      const localData = localStorage.getItem("save-state");
      this.setState(JSON.parse(localData!));
   },
   getState() {
      return this.data;
   },
   getEnabledTasks() {
      const currerntState = this.getState();

      return currerntState.filter((t) => !t.delete);
   },
   addtasks(id, title) {
      const currentState = this.getState();

      currentState.push({ id, title, completed: false });
      this.setState(currentState);
   },
   changeItemState(id, value) {
      const currentState = this.getState();

      const found = currentState.find((t) => {
         return t.id == id;
      });

      found.completed = value;
      this.setState(currentState);
   },
   setState(newState) {
      this.data = newState;

      for (const cb of this.listeners) {
         cb(newState);
      }
      localStorage.setItem("save-state", JSON.stringify(newState));
   },
   suscribe(callback: (any) => any) {
      this.listeners.push(callback);
   },
   deleteItems(item) {
      const currentState = this.getState();
      const newState = currentState.filter((elem) => {
         return elem.id !== Number(item);
      });
      //console.log(newState);

      this.setState(newState);
   },
};

export { state };
