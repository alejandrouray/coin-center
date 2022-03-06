<template>
  <header class="shadow w-screen">
    <nav>
      <nav
        class="grid grid-cols-1 lg:grid-cols-2 items-center justify-between bg-primary p-6"
      >
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <px-icon class="mr-2" />
          <router-link
            :to="{ name: 'home' }"
            class="font-semibold text-xl tracking-tight"
          >
            Coin Center
          </router-link>
        </div>
        <div class="justify-self-end hidden lg:block">
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="l in links"
              :key="l.title"
              :to="l.to"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >{{ l.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import PxIcon from '@/components/PxIcon';

export default {
  name: 'PxHeader',

  components: {
    PxIcon,
  },

  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
