<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="text-center">
          <v-card-text>
            <div class="headline">Ovo je Homepage Career Connect</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-carousel>
          <v-carousel-item
            v-for="(item, index) in carouselItems"
            :key="index"
            :src="item.src"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-footer app>
        <v-spacer></v-spacer>
        <!-- Razmak koji će postaviti gumbe na desnu stranu footer-a -->
        <v-btn text color="primary" @click="handleOption1">Opcija 1</v-btn>
        <v-btn text color="primary" @click="handleOption2">Opcija 2</v-btn>
        <v-btn text color="primary" @click="handleOption3">Opcija 3</v-btn>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      carouselItems: [
        { src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
      ],
    };
  },
  data_footer() {
    return {
      footerLinks: [
        { text: "O nama", url: "/o-nama" },
        { text: "Kontakt", url: "/kontakt" },
        { text: "Uvjeti korištenja", url: "/uvjeti-koristenja" },
      ],
    };
  },
  methods: {
    redirectTo(url) {
      // Ovdje možete implementirati logiku za preusmjeravanje na određenu URL adresu
      console.log("Redirect to:", url);
    },
  },
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
