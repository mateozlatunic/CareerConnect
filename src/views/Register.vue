<template>
  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Registracija</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="form">

              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                label="Ime"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                v-model="surname"
                :rules="[rules.required]"
                label="Prezime"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="[rules.email, rules.required]"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="[rules.password, rules.length(6), rules.required]"
                counter="6"
                label="Lozinka"
                type="password"
                required
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :rules="[rules.password, rules.length(6), rules.required]"
                counter="6"
                label="Potvrdi lozinku"
                type="password"
                required
              ></v-text-field>

              <v-select
                label="Uloga"
                :items="users"
                v-model="userTIP"
                :rules="[rules.required]"
              ></v-select>

              <v-btn
                :disabled="!form"
                :loading="isLoading"
                color="primary"
                type="button"
                @click="signup()"
                >Registriraj se</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  doc,
  auth,
  db,
  setDoc,
  createUserWithEmailAndPassword,
} from "@/firebase";

export default {
  name: "Register",
  data: () => ({
    name: null,
    surname: null,
    email: null,
    userTIP: "",
    form: false,
    isLoading: false,
    password: null,
    confirmPassword: null,
    users: ["Poslodavac", "Trazitelj posla"],
    rules: {
      email: (v) => !!(v || "").match(/@/) || " Unesi email",
      length: (len) => (v) =>
        (v || "").length >= len || `${len}`,
      password: (v) =>
        !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).*$/) ||
        "Lozinka mora sadržavati slova i brojeve",
      required: (v) => !!v || "Potrebno popuniti polje"
    },
  }),

  methods: {
    clearFormData() {
      this.name = null;
      this.surname = null;
      this.email = null;
      this.password = null;
      this.confirmPassword = null;
      this.userTIP = "";
    },

    postActionMoveToView() {
      this.$router.replace({ path: "/" });
    },

    saveAdditionalData(user, email, name, surname, usertype) {
      setDoc(doc(db, "Users", email.toLowerCase()), {
        Name: name,
        Surname: surname,
        Email: email,
        AuthorisationType: usertype
      });
    },

    signup() {
      if (this.password == this.confirmPassword) {
        const email = this.email;
        const password = this.password;
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            alert("Uspješna registracija!");
            console.log(userCredential);
            const user = userCredential.user;
            const name = this.name;
            const surname = this.surname;
            const usertype = this.userTIP;
            this.saveAdditionalData(user, email, name, surname, usertype);
            this.clearFormData();
            this.postActionMoveToView();
          })
          .catch((error) => {
            alert("Došlo je do pogreške", error);
          });
      } else {
        alert("Krvo upisane lozinke");
      }
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
}
</style>
