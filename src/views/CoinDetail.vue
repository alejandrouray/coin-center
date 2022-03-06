<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#63b3ed'" :size="100" />
    </div>

    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Current Price</b>
              <span>{{ asset.price | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Lowest Price</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Hightest Price</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Average Price</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variation 24hs</b>
              <span>{{ asset.change | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD to ${asset.symbol}` : `${asset.symbol} to USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Value in ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl"
            >{{ convertResult }} {{ fromUsd ? asset.symbol : 'USD' }}</span
          >
        </div>
      </div>

      <line-chart
        class="my-10"
        prefix="$ "
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="chartData"
        :precision="5"
      />

      <h3 class="text-xl my-10 px-5 font-bold">Best Exchange Offers</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
          class="border-b grid grid-cols-3 sm:grid-cols-4 items-center justify-center"
        >
          <td class="grid grid-cols-6 items-center">
            <strong class="col-span-5"> {{ m.name }}</strong>
            <img
              class="hidden md:inline h-6 self-center"
              :src="m.iconUrl"
              :alt="m.name"
            />
          </td>
          <td>{{ m.price | dollar }}</td>
          <td class="hidden sm:table-cell">{{ m.numberOfMarkets }} markets</td>
          <td>
            <px-button
              v-if="!m.url && !m.error"
              @click="getWebsite(m)"
              :isLoading="m.isLoading || false"
            >
              <span v-show="!m.isLoading">Visit site</span>
            </px-button>
            <span v-show="m.error" class="text-red-600">Link not found</span>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '@/api';
import PxButton from '@/components/PxButton';

export default {
  name: 'Coin-Detail',

  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },

  components: {
    PxButton,
  },

  computed: {
    min() {
      return Math.min(...this.history.map((h) => h.price)).toFixed(3);
    },

    max() {
      return Math.max(...this.history.map((h) => h.price)).toFixed(3);
    },

    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.price), 0) /
        this.history.length
      );
    },

    chartData() {
      return this.history.map((h) => [
        new Date(h.timestamp * 1000),
        parseFloat(h.price),
      ]);
    },

    convertResult() {
      if (!this.convertValue) return 0;

      const result = this.fromUsd
        ? this.convertValue / this.asset.price
        : this.convertValue * this.asset.price;

      return result.toFixed(4);
    },
  },

  created() {
    this.getCoin();
  },

  methods: {
    getWebsite(exchange) {
      window.open(exchange.coinrankingUrl, '_blank');
    },

    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;

      Promise.all([
        api.getCoin(id),
        api.getCoinHistory(id),
        api.getExchanges(id),
      ])
        .then(([asset, history, exchanges]) => {
          this.asset = asset.coin;
          this.history = history.history;
          this.markets = exchanges.exchanges;
        })
        .finally(() => (this.isLoading = false));
    },

    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
  },

  watch: {
    $route() {
      this.getCoin();
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
