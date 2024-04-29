<template>
  <v-main class="background">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="cardColor" style="max-width: 1000px">
            <v-card-text class="text-center" style="margin-top: 0px">
              <div class="head" style="font-weight: bold; font-size: 30px">
                Informacije
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Kartica 1 -->
      <div v-if="selectedJob">
        <h2>{{ selectedJob.employer }}</h2>
        <p>Kategorija: {{ selectedJob.category }}</p>
        <p>Radno mjesto: {{ selectedJob.workplace }}</p>
        <p>Rok prijave: {{ selectedJob.deadline }}</p>
        <p>Plaća: {{ selectedJob.salary }}</p>
        <p>Opis posla: {{ selectedJob.jobDescription }}</p>
        <p>Vrsta posla: {{ selectedJob.jobType }}</p>
        <p>Županija: {{ selectedJob.county }}</p>
        <p>Potrebne vještine: {{ selectedJob.skills }}</p>
        <p>Jezici: {{ selectedJob.language }}</p>
      </div>

      <!-- Kartica 2 -->
      <div
        class="card"
        style="
          margin: 50px;
          margin-right: 200px;
          background-color: white;
          margin-left: 190px;
        "
      >
        <h2>O poslu</h2>
        <strong>Opis radnog mjesta:</strong>
        <p>xxxxxxxxxxxxxxxxxxx</p>
        <strong>Vrsta posla:</strong>
        <p>xxxxxxxxxxxxxxxxxxx</p>
        <strong>Županija:</strong>
        <p>xxxxxxxxxxxxxxxxxxx</p>
      </div>

      <!-- Kartica 3 -->
      <div
        class="card"
        style="
          margin: 50px;
          margin-right: 200px;
          background-color: white;
          margin-left: 190px;
        "
      >
        <h2>O zaposleniku</h2>

        <strong>Znanja i kvalifikacije:</strong>
        <p>xxxxxxxxxxxxxxxxxxx</p>
        <strong>Strani jezik:</strong>
        <p>xxxxxxxxxxxxxxxxxxx</p>
      </div>

      <v-row justify="center" style="padding-bottom: 40px">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-5, cardColor">
            <v-card-title class="headline">Podaci za poslodavca</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm" class="w-70">
                <v-text-field v-model="ime" label="Ime" required></v-text-field>
                <v-text-field
                  v-model="prezime"
                  label="Prezime"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="kontakt"
                  label="Kontakt (mob)"
                  type="tel"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="adresa"
                  label="Adresa"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="mjesto"
                  label="Mjesto stanovanja"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="zivotopis"
                  label="Životopis (pdf)"
                  accept=".pdf"
                  required
                ></v-file-input>
                <v-checkbox
                  v-model="politika"
                  label="Potvrda o politici privatnosti i uvjetima korištenja"
                  required
                ></v-checkbox>
                <v-btn type="submit" color="primary">Pošalji</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
// import { useRoute } from "vue-router";

export default {
  name: "Job",
  data() {
    return {
      selectedJob: null,
      jobs: [
        // Job 1 - McDonalds
        {
          employer: "Mc'Donalds Inc.",
          category: "Turizam i ugostiteljstvo",
          workplace: "Varaždin",
          deadline: "25.7.2024",
          salary: "800€",
          jobDescription:
            "Rad oko blagajne, priprema hrane, posluživanje kupaca i čišćenje radnog prostora",
          jobType: "Stalni radni odnos",
          county: "Varaždinska županija",
          skills: "Rad u timu, komunikacijske vještine",
          language: "Hrvatski, engleski",
        },
        // Job 2 - Pepco
        {
          employer: "Pepco",
          category: "Trgovina",
          workplace: "Karlovac",
          deadline: "20.6.2024",
          salary: "850€",
          jobDescription:
            "Prodaja tekstila, kućnih potrepština i dekorativnih predmeta, savjetovanje kupaca i održavanje urednosti trgovine.",
          jobType: "Puno radno vrijeme",
          county: "Karlovačka županija",
          skills: "Poznavanje asortimana, komunikacijske vještine",
          language: "Hrvatski",
        },

        // Job 3 - Studenac
        {
          employer: "Studenac",
          category: "Trgovina",
          workplace: "Umag",
          deadline: "15.7.2024",
          salary: "800€",
          jobDescription:
            "Rad na blagajni, izdavanje računa, naplata robe i pružanje informacija kupcima.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Rad na blagajni, komunikacijske vještine",
          language: "Hrvatski",
        },

        // Job 4 - Muller
        {
          employer: "Muller",
          category: "Trgovina",
          workplace: "Pula",
          deadline: "21.5.2024",
          salary: "800€",
          jobDescription:
            "Rad u trgovini, usluživanje kupaca, vođenje blagajne i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Komunikacijske vještine, prodajne vještine",
          language: "Hrvatski",
        },
        // Job 5 - Lidl
        {
          employer: "Lidl",
          category: "Trgovina",
          workplace: "Split",
          deadline: "30.6.2024",
          salary: "850€",
          jobDescription:
            "Odgovornosti uključuju rad na blagajni, punjenje polica, pomoć kupcima i održavanje čistoće u trgovini.",
          jobType: "Puno radno vrijeme",
          county: "Splitsko-dalmatinska županija",
          skills: "Komunikacijske vještine, rad u timu",
          language: "Hrvatski",
        },

        // Job 6 - Decathlon
        {
          employer: "Decathlon",
          category: "Sport i rekreacija",
          workplace: "Rovinj",
          deadline: "15.7.2024",
          salary: "900€",
          jobDescription:
            "Savjetovanje kupaca o sportskoj opremi, rad na blagajni i održavanje reda u trgovini.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Poznavanje sportske opreme, komunikacijske vještine",
          language: "Hrvatski, engleski",
        },

        // Job 7 - Bauhaus
        {
          employer: "Bauhaus",
          category: "Trgovina",
          workplace: "Poreč",
          deadline: "10.7.2024",
          salary: "850€",
          jobDescription:
            "Prodaja građevinskog materijala, pomoć kupcima, izrada računa i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Poznavanje građevinskih materijala, komunikacijske vještine",
          language: "Hrvatski",
        },

        // Job 8 - Tommy Hilfiger
        {
          employer: "Tommy Hilfiger",
          category: "Moda",
          workplace: "Karlovac",
          deadline: "20.6.2024",
          salary: "900€",
          jobDescription:
            "Prodaja odjeće i modnih dodataka, pružanje savjeta kupcima i održavanje urednosti trgovine.",
          jobType: "Puno radno vrijeme",
          county: "Karlovačka županija",
          skills: "Poznavanje modne industrije, komunikacijske vještine",
          language: "Hrvatski",
        },

        // Job 9 - Pevex
        {
          employer: "Pevex",
          category: "Trgovina",
          workplace: "Poreč",
          deadline: "15.7.2024",
          salary: "850€",
          jobDescription:
            "Asistencija u prodaji kućanskih aparata, pomoć kupcima, izrada računa i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Poznavanje kućanskih aparata, komunikacijske vještine",
          language: "Hrvatski",
        },
      ],
    };
  },
  created() {
    const jobId = this.$route.params.id;
    this.selectedJob = this.jobs[parseInt(jobId, 10)];
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.position {
  margin: 50px;
  margin-right: 700px;
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

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; /* Dodaje malo prostora između redaka */
}

.info strong {
  flex-basis: 40%; /* Zauzima fiksni postotak širine kontejnera */
  background-color: white;
}

.info span {
  flex-grow: 1;
  text-align: right; /* Poravnava tekst na desno */
  background-color: white;
}
</style>
