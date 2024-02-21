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
              <v-date-picker
                v-model="date"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="modal = false"
                >
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

              <input 
                :rules="[rules.required]"
                class="butot" 
                type="file" 
                ref="PictureFile" 
              />

              <v-spacer style="margin-bottom: 50px; margin-top: 20px;"></v-spacer>

              <v-btn
                :disabled="!form"
                :loading="isLoading"
                color="primary"
                type="button"
                @click="UploadImageToStorage()"
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
  ref, getDownloadURL, storage, uploadBytes
} from "@/firebase";

export default {
  name: "Register",
  data: () => ({
    name: null,
    surname: null,
    email: null,
    userTIP: "",
    form: false,
    profilnaURL: '',
    isLoading: false,
    password: null,
    confirmPassword: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    modal: false,
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
      this.birthDate = null;
      this.date = null;
    },

    postActionMoveToView() {
      this.$router.replace({ path: "/" });
    },

    async UploadImageToStorage() {
        const storageRef = ref(storage, "Users/" + this.email + "/Profilna Slika/" + "Profilna");

        await uploadBytes(storageRef, this.$refs.PictureFile.files[0]).then((snapshot) => {
        console.log("Upload complete!");

          getDownloadURL(snapshot.ref).then((url) => {
            this.profilnaURL = url;
            this.signup();
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });
        }).catch((error) => {
          console.error("Error uploading image:", error);
        });
    },  

    saveAdditionalData(user, email, name, surname, usertype, profilna, birthDate) {
      setDoc(doc(db, "Users", email.toLowerCase()), {
        Name: name,
        Surname: surname,
        Email: email,
        Profilna: profilna,
        Birthdate: birthDate,
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
            const profilna = this.profilnaURL;
            const birthDate = this.date;
            this.saveAdditionalData(user, email, name, surname, usertype, profilna, birthDate);
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
