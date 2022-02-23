<template>
  <div class="w-full space-y-4">
    <div class="w-full text-2xl font-bold text-center">
      {{ $t("delegate_status", { name: $store.state.info.delegate_name }) }}
    </div>
    <div
      class="w-full flex md:flex-row flex-col justify-between space-x-0 space-y-8 md:space-x-8 md:space-y-8"
    >
      <div class="dark:bg-slate-800 shadow-lg flex-1 rounded-xl px-4 py-4">
        <p class="font-bold text-lg">{{ $t("status.title") }}</p>
        <div class="mt-4">
          <p>
            <b>{{ $t("status.forge") }}: </b>
            <span
              class="font-medium"
              :class="
                $store.state.info.forging == null
                  ? 'text-gray-500'
                  : $store.state.info.forging == true
                  ? 'text-green-700'
                  : 'text-red-700'
              "
              >{{ forgingStatus }}</span
            >
          </p>
          <p>
            <b>{{ $t("status.rank") }}: </b>
            <span
              class="font-medium"
              :class="
                $store.state.info.rank > $store.state.info.total_delegate
                  ? ' text-red-700'
                  : ' text-green-700'
              "
              >{{ $store.state.info.rank }}</span
            >
          </p>
          <p>
            <b>{{ $t("status.total_voter") }}: </b>
            <span class="font-medium text-green-700">{{
              $store.state.info.total_voters
            }}</span>
          </p>
          <p>
            <b>{{ $t("status.total_vote") }}: </b>
            <span class="font-medium text-green-700"
              >{{ $store.state.info.votes / 100000000 }} SXP</span
            >
          </p>
        </div>
      </div>
      <!-- <div class="dark:bg-slate-800 shadow-lg flex-1 rounded-xl p-4">
        <p class="font-bold text-lg">Funding</p>
        <div class="content mt-4">
          <p class="font-medium text-md"><b>SCF</b> 6 000 000 SXP</p>
          <p class="font-medium text-md"><b>ARKFah</b> 6 000 000 SXP</p>
        </div>
      </div> -->
      <div class="dark:bg-slate-800 shadow-lg flex-1 rounded-xl px-4 py-4">
        <p class="font-bold text-lg">{{ $t("reward.title") }}</p>
        <div class="content mt-4">
          <p class="font-medium text-md">
            <b>{{ $t("reward.share") }}:</b>
            {{ $store.state.info.voter_share }}%
          </p>
          <p class="font-medium text-md">
            <b>{{ $t("reward.payout_block_interval") }}:</b>
            {{ $store.state.info.payout_interval }} Blocks
          </p>
          <p class="font-medium text-md">
            <b>{{ $t("reward.payout_block_time") }}:</b>
            {{ payoutTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "delegate-status",
  data() {
    return {
      status: {},
    };
  },
  computed: {
    forgingStatus() {
      if (this.$store.state.info.forging == null) return "Unknown";
      return this.$store.state.info.forging == true ? "Forging" : "Standby";
    },

    payoutTime() {
      let payoutTime = this.$store.state.info.payout_time;

      let seconds = payoutTime % 60;
      let minutes = Math.floor(payoutTime / 60);
      let hours = 0;

      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
      }

      return `${hours}h ${minutes}m ${seconds}s `;
    },
  },
};
</script>

<style></style>
