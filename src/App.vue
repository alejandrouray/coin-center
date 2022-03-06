<template>
  <main>
    <px-header :links="links" />
    <router-view
      class="container sm:px-20 md:px-10 lg:px-0 py-10 flex justify-center"
    />
  </main>
</template>

<script>
import PxHeader from '@/components/PxHeader';

export default {
  name: 'App',

  components: {
    PxHeader,
  },

  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'Qwsogvtv82FCd' } },
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'razxDUgYGNAdQ' } },
        },
        {
          title: 'USDT',
          to: { name: 'coin-detail', params: { id: 'HIVsRcGKkPFtW' } },
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
