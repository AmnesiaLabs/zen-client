const ob = {
  account: {
    relay: {
      value: "",
      default: "https://tunnel.amnesia.software",
      desc: "The relay to use to connect with your Bridge",
      name: "Relay Address"
    },
    uuid: {
      value: "",
      default: "",
      desc: "The secret UUID needed to pair with your Bridge",
      name: "UUID"
    }
  },
  security: {
    dementiaMode: {
      value: false,
      default: false,
      desc:
        "Activating Dementia Mode will perform a full-wipe every time Zen is closed",
      name: "Dementia Mode"
    },
    doNotRemember: {
      value: false,
      default: false,
      desc: "Automatically sign out every time Zen is closed",
      name: "Do Not Remember"
    },
    loginTimeout: {
      value: 5,
      default: 5,
      desc:
        "The amount of seconds Zen will wait before automatically logging you in",
      name: "Auto Login Timeout"
    },
    secondaryEncryption: {
      value: false,
      default: false,
      desc:
        "Encrypt and decrypt messages within your account using a client-side key",
      name: "Secondary Encryption"
    },
    secondaryEncryptionString: {
      value: "",
      default: "",
      desc: "The 256-bit string used as a secondary encryption key",
      name: "Secondary Encryption Key"
    }
  },
  ui: {
    stylePath: {
      value: "C:UsersAlecDesktopcustom.css",
      default: "",
      desc: "The location of your custom CSS file",
      name: "Custom Style"
    },

    darkMode: {
      value: false,
      default: false,
      desc: "Change the UI color scheme",
      name: "Dark Mode"
    }
  }
};

module.exports = {
  ob
};
