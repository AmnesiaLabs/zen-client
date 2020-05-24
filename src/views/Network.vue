<template>
  <div
    class="select-none absolute overflow-y-scroll left-0 w-full bg-gray-200"
    style="top: 2.5rem; height: calc(100% - 2.5rem)"
  >
    <div class="flex justify-between h-22 w-full bg-gray-100">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="leading-6 font-medium text-gray-900">Network Analysis</h3>
        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          View details of connected peers
        </p>
      </div>
    </div>
    <div
      v-if="panel"
      class="text-sm flex justify-between h-12 w-full bg-gray-100 px-6"
    >
      <p>{{ selected[0]["id"] }}</p>
      <p class="font-mono">
        {{ selected[0]["handshake"]["headers"]["x-forwarded-for"] }}
      </p>
    </div>
    <div
      v-if="panel"
      class="text-sm flex justify-between h-12 w-full bg-gray-100 px-6"
    >
      <p>{{ selected[0]["name"] }}</p>
      <p>
        {{ selected[0].softwareInfo.name }}
        {{ selected[0].softwareInfo.version }}
      </p>
    </div>
    <div class="flex flex-col">
      <div v-if="panel">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  @click="check"
                  class="cursor-pointer hover:opacity-75 px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stop Inspecting
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div style="z-index: 999" class="w-full p-10">
        <d3-network
          @node-click="nodeClick"
          :net-nodes="nodes"
          :net-links="[]"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script>
import D3Network from "vue-d3-network";

export default {
  name: "Network",
  components: {
    D3Network
  },
  data() {
    return {
      selected: null,
      panel: false
    };
  },
  computed: {
    nodes: function() {
      let x = this.$store.getters.socketPeers;
      let y = [];

      x.forEach(z => {
        y.push({
          name: z.id,
          _color: this.randomColor()
        });
      });
      return y;
    },
    options() {
      return {
        force: 5000,
        nodeSize: 60,
        nodeLabels: true,
        linkLabels: true,
        fontSize: 12,
        canvas: true
      };
    }
  },
  methods: {
    check() {
      this.panel = false;
      this.selected = null;
    },
    nodeClick(e, o) {
      window.console.log(1);

      if (this.panel == true) {
        this.panel = false;
        this.selected = null;
        return;
      } else {
        let p = this.$store.getters.socketPeers;
        let y = p.filter(x => x.id == o.name);
        this.selected = y;
        window.console.log(3);
        this.panel = true;
      }
    },
    randomColor() {
      return (
        "rgb(" +
        parseInt(Math.random() * 32) +
        1 +
        "," +
        parseInt(Math.random() * 10) +
        1 +
        "," +
        200 +
        ")"
      );
    }
  }
};
</script>

<style scoped>
.net {
  margin: 0;
}

.node {
  stroke: red;
  stroke-width: 100px;
  -webkit-transition: fill 0.5s ease;
  transition: fill 0.5s ease;
}

.node.selected {
  stroke: #000 !important;
}

.node.pinned {
  stroke: rgba(190, 56, 93, 0.6);
}

.link {
  stroke: rgba(18, 120, 98, 0.3);
}

.link,
.node {
  stroke-linecap: round;
}

.link:hover,
.node:hover {
  stroke: #be385d;
  stroke-width: 5px;
}

.link.selected {
  stroke: rgba(202, 164, 85, 0.6);
}

.curve {
  fill: none;
}

.link-label,
.node-label {
  fill: #000;
  transform: translateX(10px);
  font-weight: 400;
}

.link-label {
  -webkit-transform: translateY(-0.5em);
  transform: translateY(-0.5em);
  text-anchor: middle;
}
</style>
