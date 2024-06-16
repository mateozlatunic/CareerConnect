<template class="purple-background">
    <v-main class="purple-background" style="padding-bottom: 198px;">
  <v-container class="about-us-container">
    <v-row>
      <v-col cols="12">
        <v-card style="margin-top: 20px;" class="cardColor">
          <v-card-title class="headline">O Nama</v-card-title>
          <v-card-text
            style="
              font-size: large;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            "
          >
            <p style="margin-top: 10px">
              Dobrodošli na našu aplikaciju za potražnju poslova! Naša misija je
              pomoći posloprimcima da pronađu idealne poslove i poslodavcima da
              pronađu najbolje talente. Vjerujemo da svaka osoba zaslužuje
              priliku raditi ono što voli, a svaka tvrtka zaslužuje najbolje
              zaposlenike.
            </p>
            <p style="margin-top: 25px">
              Naša platforma omogućava jednostavno pretraživanje i prijavu na
              poslove. Ovdje smo kako bismo osigurali brzo i sigurno iskustvo
              naših korisnika.
            </p>
            <p style="margin-top: 25px">
              Cilj nam je povezati ljude s prilikama koje im omogućuju rast i
              razvoj u profesionalnom životu. Bez obzira jeste li u potrazi za
              novim poslom ili tražite savršenog kandidata za svoju tvrtku,
              ovdje ste na pravom mjestu.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToHome">Povratak na početnu</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>

<script>
export default {
  name: "AboutUs",
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.about-us-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.purple-background {
    background-color: rgb(159, 132, 256); /* Ljubičasta boja */
}

.cardColor {
  background-color: rgb(216, 235, 255);
}
</style>
