import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";

Vue.use(Vuex);

const ipc = require("electron").ipcRenderer;
import io from "socket.io-client";

const settingsFile = require("./settingsLoader.js").load;
const saveSettingsFile = require("./settingsLoader.js").save;
const localSettings = settingsFile();

export let socket = io(localSettings.account.relay.value);

const store = new Vuex.Store({
  state: {
    loading: false,
    isDark: false,
    dashboardPaneSize: 280,
    dashboardPaneLayout: "columns",

    settings: localSettings,
    console: [],
    errors: [],

    socket: {
      connected: false,
      auth: false,
      authError: "",
      latency: -1,
      peers: []
    },

    targetId: -1,

    messages: [],
    previews: [],
    recentChats: []
  },
  getters: {
    dashboardPaneSize: state => {
      return state.dashboardPaneSize;
    },
    dashboardPaneLayout: state => {
      return state.dashboardPaneLayout;
    },
    latency: state => {
      if (state.socket.latency == -1) {
        return "NO";
      }

      return state.socket.latency;
    },
    getSettings: state => {
      return state.settings;
    },

    getConsole: state => {
      return state.console;
    },

    getLoading: state => {
      return state.loading;
    },

    socket: state => {
      return state.socket;
    },

    socketConnected: state => {
      return state.socket.connected;
    },

    socketAuth: state => {
      return state.socket.auth;
    },

    socketPeers: state => {
      return state.socket.peers;
    },

    targetId: state => {
      return state.targetId;
    },

    recentChats: state => {
      return state.recentChats;
    },

    targetMessages: state => {
      return state.messages.sort((a, b) => (a.date > b.date ? 1 : -1));
    },

    getPreviews: state => {
      return state.previews;
    },

    getTargetIdentifier: state => {
      return state.targetId;
    },

    contactList: state => {
      return state.recentChats.sort(function(a, b) {
        return b.lastReadTimestamp - a.lastReadTimestamp;
      });
    },

    getTargetHandle: state => {
      if (state.messages[0] == undefined) return "";
      return state.messages[0].handle;
    },

    isDark: state => {
      return state.isDark;
    }
  },
  mutations: {
    // for when a new connection is made
    dashboardPaneSize: (state, p) => {
      state.dashboardPaneSize = p;
    },
    // for when a new connection is made
    dashboardPaneLayout: (state, p) => {
      state.dashboardPaneLayout = p;
    },
    // for when a new connection is made
    peerJoined: (state, p) => {
      window.console.log(p);
      state.console.unshift({
        timestamp: Date.now(),
        line: "A new peer connected, querying..."
      });
      state.socket.peers = p;
      state.loading = false;
    },

    // called when a connection drops
    peerLeft: (state, p) => {
      state.console.unshift({
        timestamp: Date.now(),
        line: "A peer disconnected, querying..."
      });
      state.socket.peers = p;
      state.loading = false;
    },

    sendMessage: (state, msg) => {
      state.loading = true;

      console.log(msg);

      clientSendMessage(msg);

      let timestamp = new Date();
      let tar = state.messages.sort((a, b) => (a.date > b.date ? 1 : -1));
      timestamp = tar[tar.length - 1].date + 99999999;

      state.messages.push({
        date: timestamp,
        handle: msg.handle_id,
        is_from_me: 1,
        text: msg.text
      });

      setTimeout(() => {
        state.loading = false;
      }, 300);
    },

    // called when recent contacts are provided
    recentContacts: (state, p) => {
      window.console.log(p);

      state.console.unshift({
        timestamp: Date.now(),
        line: "Recieved recent contacts, sorting..."
      });

      state.recentChats = p.data;

      window.console.log(
        `store recentContacts just saved: ${state.recentChats.length}`
      );
      // p.data.forEach(pp => {

      //     state.recentChats.push({
      //         id: pp.handle_id,
      //         name: pp.display_name !== "" ? pp.display_name : pp.id,
      //         handle: pp.handle,
      //         unread: true,
      //         last_timestamp: '2m',
      //         messages: pp.text
      //     })
      // })

      state.loading = false;
    },

    // called when recent contacts are provided
    recentChats: (state, p) => {
      state.console.unshift({
        timestamp: Date.now(),
        line: "Recieved recent messages, sorting..."
      });
      state.messages = p.data;

      if (state.previews.filter(x => x.id == p.data[0].handle).length == 0) {
        state.previews.push({
          id: p.data[0].handle,
          text: p.data[0].text,
          date: fromAppleTime(p.data[0].date)
        });
      } else {
        state.previews.forEach(x => {
          if (x.id == p.data[0].handle) {
            p.text = p.data[0].text;
          }
        });
      }

      state.loading = false;
    },

    // will save config file
    doSettingsWrite: (state, s) => {
      state.console.unshift({
        timestamp: Date.now(),
        line: "Wrote new configuration file"
      });
      saveSettingsFile(s);
      state.settings = s;
      state.loading = false;
    },

    // will log to user's ui console in prefs
    log: (state, s) => {
      state.console.unshift({
        timestamp: Date.now(),
        line: s
      });
    },

    socketOnConnect: (state, status) => {
      state.loading = true;
      state.socket.connected = true;
      state.console.unshift({
        timestamp: Date.now(),
        line: "Connected to UDP server"
      });
      state.loading = false;
    },

    socketAuth: (state, creds) => {
      if (
        state.settings.account.relay.value !== creds.relay ||
        state.settings.account.uuid.value !== creds.uuid
      ) {
        state.settings.account.relay.value = creds.relay;
        state.settings.account.uuid.value = creds.uuid;
        saveSettingsFile(state.settings);
      }

      socket = io(state.settings.account.relay.value);

      state.loading = true;
      state.console.unshift({
        timestamp: Date.now(),
        line: "Trying to login..."
      });

      creds.softwareInfo = require("../../package.json");

      socket.emit("client:authenticate", creds, res => {
        if (res == 500) {
          // login failed
          state.socket.auth = false;
          state.socket.authError = "Login failed.";
          state.console.unshift({
            timestamp: Date.now(),
            line: "Login failed"
          });
          state.loading = false;
        }

        if (res == 200) {
          state.console.unshift({
            timestamp: Date.now(),
            line: "Login was successful"
          });
          state.socket.auth = true;
          state.socket.connected = true;
          state.socket.authError = "";
          clientSetName(creds.uuid);
        }
      });
    },

    socketOnDisconnect: (state, status) => {
      state.console.unshift({
        timestamp: Date.now(),
        line: "Local connection dropped. Now offline."
      });
      state.connect = false;
    },

    socketOnPong: (state, ms) => {
      state.socket.latency = ms;
    },

    targetId: (state, i) => {
      state.targetId = i.id;
      clientGetRecentChatsFromId(i);
      //   state.recentChats.forEach(p => {
      //     if (p.handle_id == i.handle_id) {
      //       p.is_unread = false;
      //     }
      //   });
    },

    setLoading: (state, l) => {
      state.loading = l;
    },

    toggleDark: (state, l) => {
      state.isDark = !state.isDark;
    },

    newMessage: (state, l) => {
      state.loading = true;
      state.recentChats.forEach(ch => {
        if (ch.handle !== l.handle) return;
        ch.unread = true;
        ch.messages.push({
          from: "them",
          timestamp: "0s",
          text: l.text
        });
      });

      setTimeout(() => {
        state.loading = false;
      }, 300);
    },

    recentFill: (state, l) => {
      state.loading = true;
      state.recentChats.forEach(ch => {
        if (ch.handle !== l.handle) return;
        ch.unread = true;
        ch.messages.push({
          from: "them",
          timestamp: "0s",
          text: l.text
        });
      });

      setTimeout(() => {
        state.loading = false;
      }, 300);
    }
  },
  actions: {
    minimizeWindow: () => {
      ipc.send("event", {
        type: "hide",
        value: null
      });
    },
    forceQuit: () => {
      ipc.send("event", {
        type: "forceQuit",
        value: null
      });
    }
  },
  modules: {}
});

const clientSetName = n => {
  socket.emit("client:setName", n, res => {
    if (res == 200) {
      setTimeout(() => {
        clientInit();
      }, 300);
    }
    return;
  });
};

const clientGetRecentContacts = n => {
  socket.emit("raw", {
    type: "recentContacts",
    id: 0
  });
};

const clientSendMessage = n => {
  socket.emit("raw", {
    type: "send",
    id: n.handle_id,
    text: n.text
  });
};

const clientGetRecentChatsFromId = n => {
  console.log(`Getting recent chats... for ${n.handle_id}`);
  socket.emit("raw", {
    type: "recentChats",
    id: n.handle_id
  });
};

const clientInit = n => {
  console.log("Initializing...");
  router.push("/").catch(() => {});

  socket.on("connect", s => {
    store.commit("socketOnConnect", true);
  });

  socket.on("pong", function(ms) {
    store.commit("socketOnPong", ms);
  });

  socket.on("reconnect", s => {
    store.commit("log", "Reconnected...");
    store.commit("socketOnConnect", true);
    if (
      store.getters.getSettings.account.relay.value !== "" &&
      store.getters.getSettings.account.uuid.value !== ""
    ) {
      store.commit("log", "Retrying authentication...");
      store.commit("socketAuth", {
        relay: store.getters.getSettings.account.relay.value,
        uuid: store.getters.getSettings.account.uuid.value
      });
    }
  });

  socket.on("peerJoined", s => {
    store.commit("peerJoined", s);
  });

  socket.on("peerLeft", s => {
    store.commit("peerLeft", s);
  });

  socket.on("raw", s => {
    if (!s.type) return;
    store.commit(s.type, s);
  });

  clientGetRecentContacts();
};

// Since macOS 10.13 High Sierra, some timestamps appear to have extra data
// packed. Dividing by 10^9 seems to get an Apple-style timestamp back.
// According to a StackOverflow user, timestamps now have nanosecond precision
const unpackTime = ts => {
  return Math.floor(ts / Math.pow(10, 9));
};

// TODO: Do some kind of database-based detection rather than relying on the
// operating system version
const packTimeConditionally = ts => {
  if (macosVersion.is(">=10.13")) {
    return ts * Math.pow(10, 9);
  } else {
    return ts;
  }
};
const DATE_OFFSET = 978307200;

// Transforms an Apple-style timestamp to a proper unix timestamp
const fromAppleTime = ts => {
  if (ts == 0) {
    return null;
  }

  // unpackTime returns 0 if the timestamp wasn't packed
  // TODO: see `packTimeConditionally`'s comment
  if (unpackTime(ts) != 0) {
    ts = unpackTime(ts);
  }

  return new Date((ts + DATE_OFFSET) * 1000);
};

export default store;
