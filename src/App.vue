<template>
  <v-app dark class="main-app ">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
// import components
import Navbar from "@/components/navbar/navbar.default";
import Footer from "@/components/footer/footer.default";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>
