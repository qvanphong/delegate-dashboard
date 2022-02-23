<template>
  <div class="w-full">
    <div class="mb-4 flex flex-row items-center space-x-2">
      <input
        class="w-full md:w-fit p-2 dark:bg-slate-800 shadow-lg rounded-lg border-2 border-solid border-gray-100 dark:border-slate-800"
        placeholder="Search address"
        v-model="searchKeyword"
        @change="onSearchVoter"
      />
      <button
        class="dark:bg-slate-800 shadow-lg p-2 rounded-lg border-2 border-solid border-gray-100 dark:border-slate-800"
        @click="onSearchVoter"
      >
        <IconMagnifyingGlass></IconMagnifyingGlass>
      </button>
      <span v-if="isSearching">
        {{ $t("total_result", { total: totalResult }) }}
      </span>
    </div>
    <div class="shadow-lg p-4 rounded-xl dark:bg-slate-800">
      <table class="w-full table-fixed">
        <thead class="border-b border-b-secondary dark:border-b-dark-secondary">
          <tr>
            <th class="text-lg font-medium">{{ $t("table.address") }}</th>
            <th class="text-lg font-medium">{{ $t("table.pending") }}</th>
            <th class="text-lg font-medium">{{ $t("table.paid") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="voter in voters"
            :key="voter.address"
            class="dark:bg-slate-800 dark:even:bg-slate-700 even:bg-gray-100 hover:dark:bg-slate-900 hover:bg-gray-100 cursor-pointer w-full h-12 z-10"
          >
            <td class="pl-2">
              <a
                :href="`https://explorer.solar.network/devnet/wallet/${voter.address}`"
                target="_blank"
                class="font-medium"
                >{{ voter.address }}</a
              >
            </td>
            <td class="text-center text-orange-400">
              {{ voter.unpaid / 100000000 }} SXP
            </td>
            <td class="text-center text-orange-400">
              {{ voter.paid / 100000000 }} SXP
            </td>
          </tr>
        </tbody>
      </table>
      <v-pagination
        v-model="page"
        :pages="pages"
        :range-size="1"
        active-color="#fb923c"
        class="justify-center mt-4"
        @update:modelValue="onPaginate"
      />
    </div>
  </div>
</template>

<script>
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import VPagination from "@hennge/vue3-pagination";

import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: { VPagination, IconMagnifyingGlass },
  data() {
    return {
      voters: [],
      page: 1,
      pages: 1,
      searchKeyword: "",
      isSearching: false,
      totalResult: 0,
    };
  },
  created() {
    this.fetchVoters(1);
  },
  methods: {
    // API Consumes
    fetchVoters(page) {
      this.$axios.get("/voters", { params: { page: page } }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.voters = res.data.result;
          this.pages = res.data.total_page;
          this.total = res.data.total;
        }
      });
    },

    findVoter(address) {
      this.$axios
        .get("/voter", { params: { address: address, page: this.page } })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            this.voters = res.data.result;
            this.pages = res.data.total_page;
            this.total = res.data.total;
          }
        });
    },

    // Listeners/event handling
    onPaginate(value) {
      this.fetchVoters(value);
    },

    onSearchVoter() {
      this.page = 1;
      this.isSearching = this.searchKeyword !== "";

      if (this.searchKeyword === "") {
        this.fetchVoters(1);
      } else {
        this.findVoter(this.searchKeyword);
      }
    },
  },
};
</script>

<style></style>
