<template>
  <v-main class="background" style="padding-top: 25px">
    <v-container
      :style="
        filteredJobs.length === 0
          ? 'padding-bottom: 405px;'
          : 'padding-bottom: 50px;'
      "
    >
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="cardColor" style="max-width: 1000px">
            <v-card-text class="text-center">
              <div class="head" style="font-weight: bold; font-size: 30px">
                Career Connect
              </div>
            </v-card-text>
            <v-card-text class="text-center">
              <div class="head" style="font-weight: bold; font-size: 25px">
                Najbolje mjesto za potražnju poslova
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card
            class="cardColor"
            max-width="600"
            style="margin: -10px; padding-top: 35px"
          >
            <v-row justify="center">
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  v-model="search"
                  label="Pretraži poslove"
                  placeholder="Unesite naziv posla ili grad"
                  outlined
                  color="black;"
                  style="margin: 0 auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row style="margin-left: -38px; margin-right: -100px">
        <v-col
          v-for="(job, index) in filteredJobs"
          :key="index"
          class="d-flex child-flex mt-5"
          cols="4"
        >
          <v-card
            class="mx-auto cardColor"
            max-width="400"
            style="margin: 0 20px"
          >
            <v-img
              class="align-end text-white"
              height="300"
              :src="job.image"
              contain
            >
            </v-img>

            <v-card-title class="black--text"></v-card-title>

            <v-card-subtitle class="pt-4"></v-card-subtitle>

            <v-card-actions>
              <v-btn color="black" text to="/job">
                Otvori
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      search: "",
      jobs: [
        {
          title: "Mc'Donalds",
          subtitle: "Varaždin / Prijava do: 25.7.2024",
          image:
            "https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-preview.jpg",
        },
        {
          title: "Pepco",
          subtitle: "Karlovac / Prijava do: 25.7.2024",
          image:
            "https://www.supernova-gardenmall.hr//fileadmin/shared/logos/Pepco.png",
        },
        {
          title: "Studenac",
          subtitle: "Umag / Prijava do: 25.7.2024",
          image:
            "https://cdn.aiidatapro.net/media/90/b7/dd/t780x490/90b7ddfd52bd306d8707cb838e0787bd.jpg",
        },
        {
          title: "Muller",
          subtitle: "Pula / Prijava do: 25.7.2024",
          image:
            "https://www.mueller.hr/assets/download/33/MuellerUeberBluete4c-2633.jpg",
        },
        {
          title: "Lidl",
          subtitle: "Split / Prijava do: 25.7.2024",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/768px-Lidl-Logo.svg.png",
        },
        {
          title: "Decathlon",
          subtitle: "Rovinj / Prijava do: 25.7.2024",
          image:
            "https://img-cdn.thepublive.com/fit-in/580x0/filters:format(webp)/socialsamosa/media/post_attachments/8beb3f26-145.jpg",
        },
        {
          title: "Bauhaus",
          subtitle: "Poreč / Prijava do: 25.7.2024",
          image:
            "https://logos-world.net/wp-content/uploads/2022/04/Bauhaus-Symbol.png",
        },
        {
          title: "Tommy Hilfiger",
          subtitle: "Karlovac / Prijava do: 25.7.2024",
          image:
            "https://i.pinimg.com/736x/d3/09/1a/d3091a1a5350fede679b2c7461b0745b.jpg",
        },
        {
          title: "Pevex",
          subtitle: "Poreč / Prijava do: 25.7.2024",
          image:
            "https://pevex.hr/Documents/relative_ckeditor/pevex_logo_zeleno.jpg",
        },
      ],
    };
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(this.search.toLowerCase()) ||
          job.subtitle.toLowerCase().includes(this.search.toLowerCase())
      );
    },
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
  font-size: 200px;
  font-weight: bold;
  margin-bottom: 20px;
}

.head {
  color: rgb(29, 29, 29);
  font-family: "Nunito", sans-serif;
}

.background {
  background-color: rgb(159, 132, 256);
}

.cardColor {
  background-color: rgb(216, 235, 255);
}
</style>
