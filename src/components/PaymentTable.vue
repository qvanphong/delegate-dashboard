<template>
  <div class="w-full">
    <div class="mb-4 flex flex-row items-center space-x-2">
      <input
        class="w-full md:w-fit p-2 dark:bg-slate-800 shadow-lg rounded-lg border-2 border-solid border-gray-100 dark:border-slate-800"
        placeholder="Search address"
        v-model="searchKeyword"
        @change="onSearchPayment"
      />
      <button
        class="dark:bg-slate-800 shadow-lg p-2 rounded-lg border-2 border-solid border-gray-100 dark:border-slate-800"
        @click="onSearchPayment"
      >
        <IconMagnifyingGlass></IconMagnifyingGlass>
      </button>
      <span v-if="isSearching">
        {{ $t("total_result", { total: totalResult }) }}
      </span>
    </div>
    <div class="shadow-lg p-4 rounded-xl dark:bg-slate-800">
      <table class="w-full table-auto">
        <thead class="border-b border-b-secondary dark:border-b-dark-secondary">
          <tr>
            <th class="text-lg font-medium">{{ $t("table.tx") }}</th>
            <th class="text-lg text-left font-medium">
              {{ $t("table.process_time") }}
            </th>
            <th class="text-lg font-medium">
              {{ $t("table.receiver") }}
            </th>
            <th class="text-lg font-medium">
              {{ $t("table.amount") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in payments"
            :key="payment.id"
            class="dark:bg-slate-800 dark:even:bg-slate-700 even:bg-gray-100 hover:dark:bg-slate-900 hover:bg-gray-100 cursor-pointer w-full h-12 z-10"
          >
            <td>
              <a
                class="text-center"
                :href="`https://explorer.solar.network/devnet/transactions/${payment.id}`"
                target="_blank"
              >
                <IconEye class="mx-auto w-4 text-orange-400"
              /></a>
            </td>
            <td class="pl-2">
              {{ payment.process_at }}
            </td>
            <td class="text-center text-orange-400">
              {{ payment.address }}
            </td>
            <td class="text-center text-orange-400">
              {{ payment.total_amount / 100000000 }} SXP
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
import IconEye from "@/components/icons/IconEye.vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import VPagination from "@hennge/vue3-pagination";

import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: { VPagination, IconEye, IconMagnifyingGlass },
  data() {
    return {
      payments: [],
      page: 1,
      pages: 1,
      searchKeyword: "",
      isSearching: false,
      totalResult: 0,
    };
  },
  created() {
    this.fetchPayments(1);
  },
  methods: {
    // API Consumes
    fetchPayments(page) {
      this.$axios.get("/payments", { params: { page: page } }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.payments = res.data.result;
          this.pages = res.data.total_page;
          this.total = res.data.total;
        }
      });
    },

    findPayment(address) {
      this.$axios
        .get("/payment", { params: { address: address, page: this.page } })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            this.payments = res.data.result;
            this.pages = res.data.total_page;
            this.total = res.data.total;
          }
        });
    },

    // Listeners/event handling
    onPaginate(value) {
      this.fetchPayments(value);
    },

    onSearchPayment() {
      this.page = 1;
      this.isSearching = this.searchKeyword !== "";

      if (this.searchKeyword === "") {
        this.fetchPayments(1);
      } else {
        this.findPayment(this.searchKeyword);
      }
    },
  },
};
</script>

<style></style>
