<template>
  <div id="header">
    <nav class="w-full bg-orange-500 dark:bg-slate-800 py-4 shadow-xl">
      <div class="sm:w-full lg:w-4/6 ml-auto mr-auto flex items-center">
        <!-- App Name -->
        <router-link
          to="/"
          class="flex-1 text-left nav-item text-lg font-medium"
          >Payment Dashboard</router-link
        >
        <!-- Nav items -->
        <div class="space-x-4">
          <router-link to="payments" class="nav-item">{{
            $t("menu.payment")
          }}</router-link>

          <a
            class="nav-item"
            :href="`https://delegates.solar.network/dsxp/delegates/${$store.state.info.delegate_name}`"
            >{{ $t("menu.proposal") }}</a
          >
        </div>
        <div class="ml-4">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton>{{ $t("menu.language") }}</MenuButton>
            </div>
            <MenuItems
              class="z-20 absolute left-0 w-32 mt-2 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem
                v-for="language in languages"
                :key="language.value"
                v-slot="{ active }"
              >
                <button
                  class="dark:bg-slate-800"
                  :class="[
                    active
                      ? 'bg-orange-400 dark:bg-slate-700 text-white'
                      : 'text-gray-900 dark:text-white',
                    'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                  ]"
                  @click="changeLanguage(language.value)"
                >
                  {{ language.title }}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div class="ml-4 cursor-pointer">
          <IconDark @click="toggleDarkMode"></IconDark>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import IconDark from "@/components/icons/IconDark.vue";

export default {
  name: "page-header",
  data() {
    return {
      languages: [
        {
          title: "English",
          value: "en",
        },
        {
          title: "Vietnamese",
          value: "vi",
        },
      ],
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    IconDark,
  },
  methods: {
    toggleDarkMode() {
      if (localStorage.getItem("dark_mode") == null) {
        localStorage.setItem("dark_mode", true);
        document.querySelector("html").classList.add("dark");
      } else {
        localStorage.removeItem("dark_mode");
        document.querySelector("html").classList.remove("dark");
      }
    },
    changeLanguage(value) {
      localStorage.setItem("lang", value);
      this.$i18n.locale = value;
    },
  },
};
</script>

<style>
.nav-item {
  cursor: pointer;
  color: var(--vt-c-white) !important;
}

#header {
  color: var(--vt-c-white);
}
</style>
