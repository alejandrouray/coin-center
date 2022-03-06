<template>
  <table class="w-full mx-4">
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th class="hidden lg:table-cell"></th>
        <th
          class="hidden lg:table-cell"
          :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
        >
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Name</th>
        <th>Price</th>
        <th class="hidden lg:table-cell">Market Cap.</th>
        <th>Variation</th>
        <td class="hidden sm:block text-center">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Search..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td class="hidden lg:table-cell">
          <img
            class="w-6 h-6"
            :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            :alt="a.name"
          />
        </td>
        <td class="hidden lg:table-cell">
          <strong># {{ a.rank }}</strong>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{
              name: 'coin-detail',
              params: {
                id: a.id,
              },
            }"
          >
            {{ a.name }}
          </router-link>
          <small class="hidden lg:inline ml-1 text-gray-500">{{
            a.symbol
          }}</small>
        </td>
        <td>{{ a.price | dollar }}</td>
        <td class="hidden lg:block">{{ a.marketCap | dollar }}</td>
        <td :class="a.change.includes('-') ? 'text-red-600' : 'text-green-600'">
          {{ a.change | percent }}
        </td>
        <td class="sm:block">
          <px-button @click="goToCoin(a.uuid)">
            <span>Details</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '@/components/PxButton';

export default {
  name: 'PxAssetsTable',

  components: {
    PxButton,
  },

  data() {
    return {
      filter: '',
      sortOrder: 1,
    };
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          return parseInt(a.rank) > parseInt(b.rank)
            ? this.sortOrder
            : altOrder;
        });
    },
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } });
    },

    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  text-align: center;
  font-size: 0.8rem;
}

th {
  padding: 5px;
  font-size: 0.8rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
