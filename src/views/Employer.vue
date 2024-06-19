<template>
  <v-main class="main">
    <v-container>
      <v-row justify="center" class="form-row" v-for="(job, index) in jobs" :key="index">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-5 cardColor" v-if="!job.status">
            <v-card-title class="headline">Prijava za posao - {{ index + 1 }}</v-card-title>
            <v-card-text>
              <v-form class="form-content">
                <v-text-field v-model="job.ime" label="Ime" readonly></v-text-field>
                <v-text-field v-model="job.prezime" label="Prezime" readonly></v-text-field>
                <v-text-field v-model="job.email" label="Email" type="email" readonly></v-text-field>
                <v-text-field v-model="job.kontakt" label="Kontakt (mob)" type="tel" readonly></v-text-field>
                <v-text-field v-model="job.adresa" label="Adresa" readonly></v-text-field>
                <v-text-field v-model="job.mjesto" label="Mjesto stanovanja" readonly></v-text-field>
                <v-text-field v-model="job.naziv" label="Naziv posla" readonly></v-text-field>
                <v-btn :href="job.zivotopis" target="_blank" color="primary" class="mt-2">Preuzmi Životopis</v-btn>
                <v-card-title class="headline">Opcionalno</v-card-title>
                <v-card class="optional-rating-card">
                  <v-row class="d-flex align-center">
                    <v-col cols="12" md="4">
                      <div style="margin-left: 10px">Ocijenite poslodavca:</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-rating v-model="job.rating" color="yellow darken-3" background-color="yellow darken-3" half-increments readonly></v-rating>
                    </v-col>
                  </v-row>
                </v-card>
                <v-checkbox v-model="job.politika" label="Potvrda o politici privatnosti i uvjetima korištenja" readonly></v-checkbox>
                <v-row class="d-flex justify-center mt-4">
                  <v-btn color="green" @click="acceptJob(index)">Prihvaćen</v-btn>
                  <v-btn color="red" @click="rejectJob(index)" class="ml-2">Odbijen</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <v-card v-else :class="job.status === 'accepted' ? 'accepted-card' : 'rejected-card'">
            <v-card-title class="headline">{{ job.naziv }} posao je {{ job.status === 'accepted' ? 'prihvaćen' : 'neprihvaćen' }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
  name: "Employer",
  data() {
    return {
      jobs: [],
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Unesi email",
        required: (v) => !!v || "Potrebno popuniti polje",
        telephoneNumber: (v) => (!!v && v.length === 10) || "Unesi 10 brojeva",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "jobApplication"));
        const jobsArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          jobsArray.push({
            ime: data.ime,
            prezime: data.prezime,
            email: data.email,
            kontakt: data.kontakt,
            adresa: data.adresa,
            mjesto: data.mjesto,
            naziv: data.naziv,
            zivotopis: data.zivotopis, // URL objave PDF
            politika: data.politika,
            rating: data.rating,
            status: null, 
          });
        });
        this.jobs = jobsArray;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka: ", error);
      }
    },
    acceptJob(index) {
      this.$set(this.jobs, index, { ...this.jobs[index], status: 'accepted' });
    },
    rejectJob(index) {
      this.$set(this.jobs, index, { ...this.jobs[index], status: 'rejected' });
    },
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

.accepted-card {
  background-color: #c8e6c9; /* Zelena boja */
}

.rejected-card {
  background-color: #ffcdd2; /* Crvena boja */
}

.main {
  height: 100%;
  width: 100%;
  background-color: rgb(159, 132, 256);
}
</style>
