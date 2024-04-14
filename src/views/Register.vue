<template>
  <v-main class="background" style="padding-top: 10px">
    <v-container style="padding-bottom: 50px">
      <v-row justify="center" class="mt-4">
        <v-col cols="12" sm="8" md="6">
          <v-card class="cardColor">
            <v-card-title>Registracija</v-card-title>
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

                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Odaberite datum rođenja"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

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

                <v-text-field
                  v-if="userTIP === 'Poslodavac'"
                  v-model="interest"
                  :rules="[rules.required]"
                  label="Zanimanje"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  v-if="userTIP === 'Poslodavac'"
                  v-model="telephone"
                  :rules="[rules.telephoneNumber, rules.required]"
                  label="Telefonski broj"
                  type="tel"
                  required
                ></v-text-field>

                <v-text-field
                  v-if="userTIP === 'Poslodavac'"
                  v-model="companyName"
                  :rules="[rules.required]"
                  label="Naziv tvrtke"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  v-if="userTIP === 'Poslodavac'"
                  v-model="companyAddress"
                  :rules="[rules.required]"
                  label="Adresa tvrtke"
                  type="text"
                  required
                ></v-text-field>

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
  </v-main>
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
    telephone: null,
    interest: null,
    companyName: null,
    companyAddress: null,
    password: null,
    confirmPassword: null,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    users: ["Poslodavac", "Trazitelj posla"],
    rules: {
      email: (v) => !!(v || "").match(/@/) || " Unesi email",
      length: (len) => (v) => (v || "").length >= len || `${len}`,
      password: (v) =>
        !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).*$/) ||
        "Lozinka mora sadržavati slova i brojeve",
      required: (v) => !!v || "Potrebno popuniti polje",
      telephoneNumber: (v) => (!!v && v.length === 10) || "Unesi 10 brojeva",
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
      this.birthDate = null;
      this.date = null;
      this.telephone = null;
      this.interest = null;
      this.companyAddress = null;
      this.companyName = null;
    },

    postActionMoveToView() {
      this.$router.replace({ path: "/" });
    },

    saveAdditionalData(
      email,
      name,
      surname,
      password,
      usertype,
      birthDate,
      companyName,
      companyAddress,
      interest,
      telephone
    ) {
      if (usertype === "Poslodavac") {
        setDoc(doc(db, "Users", email.toLowerCase()), {
          Name: name,
          Surname: surname,
          Email: email,
          Password: password,
          Birthdate: birthDate,
          AuthorisationType: usertype,
          CompanyName: companyName,
          CompanyAddress: companyAddress,
          Interest: interest,
          TelephoneNumber: telephone,
        });
      } else {
        setDoc(doc(db, "Users", email.toLowerCase()), {
          Name: name,
          Surname: surname,
          Email: email,
          Password: password,
          Birthdate: birthDate,
          AuthorisationType: usertype,
        });
      }
    },
    signup() {
      if (this.password === this.confirmPassword) {
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
            const birthDate = this.date;
            const companyName = this.companyName;
            const companyAddress = this.companyAddress;
            const interest = this.interest;
            const telephoneNumber = this.telephone;
            this.saveAdditionalData(
              email,
              name,
              surname,
              password,
              usertype,
              birthDate,
              companyName,
              companyAddress,
              interest,
              telephoneNumber
            );
            this.clearFormData();
            this.postActionMoveToView();
          })
          .catch((error) => {
            alert("Došlo je do pogreške: " + error.message);
          });
      } else {
        alert("Lozinke se ne podudaraju");
      }
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
}

.background {
  background-color: rgb(159, 132, 256);
}

.cardColor {
  background-color: rgb(230, 242, 255);
}
</style>
