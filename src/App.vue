<script>
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import DelegateStatus from "@/components/DelegateStatus.vue";

export default {
  components: { RouterView, Header, DelegateStatus },
  created() {
    // fetch delegate info
    this.$axios.get("/info").then((res) => {
      this.$store.commit("setInfo", res.data);
      console.log(this.$store.state.info);
    });

    // setting up dark mode
    if (localStorage.getItem("dark_mode"))
      document.querySelector("html").classList.add("dark");

    // setting up language
    if (localStorage.getItem("lang"))
      this.$i18n.locale = localStorage.getItem("lang");
  },
};
</script>

<template>
  <Header></Header>
  <div class="sm:w-full lg:w-4/6 mx-auto space-y-8 my-8">
    <DelegateStatus></DelegateStatus>
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
  width: 100%;
  height: 100%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
