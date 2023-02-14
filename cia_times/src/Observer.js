export default class Observer {

    constructor() {
      this._listeners = [];
    }
  
    Subscrible = function (handler) {
      this._listeners.push(handler);
    }
  
    Unsubscrible = function (handler) {
      let index = this._listeners.indexOf(handler);
  
      if (index !== -1) this._listeners.splice(index, 1);
    }
  
    Notify = function (args) {
      this._listeners.forEach(handler => handler(args));
    }
  }
  
  