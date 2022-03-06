<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#63b3ed'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from '@/api';
import PxAssetsTable from '@/components/PxAssetsTable';

export default {
  name: 'Home-View',

  components: { PxAssetsTable },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;

    api
      .getRanking()
      .then((res) => (this.assets = res.coins))
      .finally(() => (this.isLoading = false));
  },
};
</script>
