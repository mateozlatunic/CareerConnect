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
      <div
        class="card"
        style="
          margin: 50px;
          margin-right: 250px;
          background-color: white;
          margin-left: 250px;
        "
      >
        <h2>Opis posla (m/ž)</h2>
        <div class="info"><strong>Poslodavac:</strong><span>XXX</span></div>
        <div class="info"><strong>Kategorija:</strong><span>XXX</span></div>
        <div class="info"><strong>Mjesto rada:</strong><span>XXX</span></div>
        <div class="info"><strong>Rok prijave:</strong><span>XXX</span></div>
        <div class="info"><strong>Plaća:</strong><span>XXX</span></div>
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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'Job',
    setup() {
        
    },
})
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
