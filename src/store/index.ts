import { createStore } from "vuex";
import Log from "../models/Log";
import { findIndex } from "lodash";

export default createStore({
  state: {
    logs: [
      {
        duration: "8h",
        project: "Hydra",
        remarks: "Demo for VueJS and TS",
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        isEditing: false
      },
      {
        duration: "8h",
        project: "Hydra",
        remarks: "UI design",
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        isEditing: false
      }
    ] as Log[]
  },
  mutations: {
    addLog: (state, log) => state.logs.push(log),
    saveLogUpdates(state, log) {
      const logIndex = findIndex(state.logs, log);
      state.logs[logIndex].duration = log.duration;
      state.logs[logIndex].project = log.project;
      state.logs[logIndex].remarks = log.remarks;
      state.logs[logIndex].isEditing = false;
      console.log("saveLogUpdates")
    },
    deleteLog(state, log) {
      let logIndex = findIndex(state.logs, log);
      state.logs.splice(logIndex, ++logIndex);
    },
    completeTask(state, log) {
      const logIndex = findIndex(state.logs, log);
      state.logs[logIndex].completed = true;
    },
    showEditForm(state, log) {
      const logIndex = findIndex(state.logs, log);
      state.logs[logIndex].isEditing = true;
    },
    hideEditForm(state, log) {
      const logIndex = findIndex(state.logs, log);
      state.logs[logIndex].isEditing = false;
    }
  },
  actions: {},
  modules: {}
});
