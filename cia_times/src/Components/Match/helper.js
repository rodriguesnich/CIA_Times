import Observer from "../../Observer";

const MatchDialogHelper = {
  Observer: new Observer(),

  Open: () => {
    MatchDialogHelper.Observer.Notify();
  },
};

export default MatchDialogHelper;
