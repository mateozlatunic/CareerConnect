<template>
  <v-main class="purple-background" >
    <v-container style="margin-bottom: 72px; background-color: rgb(216, 235, 255); border-radius: 5px;">
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
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
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
          @click="saveProfile"
        >
          Spremi
        </v-btn>

        <v-btn style="margin-left: 10px;"
          color="red"
          type="button"
          @click="deleteAccount"
        >
          Obriši račun
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export default {
  data: () => ({
    form: true,
    modal: false,
    isLoading: false,
    name: "",
    surname: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    userTIP: "",
    interest: "",
    telephone: "",
    companyName: "",
    companyAddress: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    users: ["Poslodavac", "Kandidat"],
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
      password: (value) => value.length >= 6 || "Password must be at least 6 characters.",
      length: (len) => (value) => value.length >= len || `Must be at least ${len} characters.`,
      telephoneNumber: (value) => /^\d+$/.test(value) || "Must be a valid telephone number.",
    },
  }),

  mounted() {
    this.loadProfile();
  },

  methods: {
    async loadProfile() {
      const user = auth.currentUser;
      const userDoc = doc(db, "Users", user.email);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.name = data.name || "";
        this.surname = data.surname || "";
        this.date = data.date || "";
        this.email = data.email || "";
        this.userTIP = data.userTIP || "";
        this.interest = data.interest || "";
        this.telephone = data.telephone || "";
        this.companyName = data.companyName || "";
        this.companyAddress = data.companyAddress || "";
      }
    },
    async saveProfile() {
      this.isLoading = true;
      const user = auth.currentUser;
      try {
        // Ažuriranje lozinke u Firebase Authentication sustavu
        if (this.password !== "" && this.password === this.confirmPassword) {
          await updatePassword(user, this.password);
        }
        // Ažuriranje korisničkih podataka u Firestore
        const userDoc = doc(db, "Users", user.email);
        await setDoc(userDoc, {
          name: this.name,
          surname: this.surname,
          date: this.date,
          email: this.email,
          password: this.password,
          userTIP: this.userTIP,
          interest: this.interest,
          telephone: this.telephone,
          companyName: this.companyName,
          companyAddress: this.companyAddress,
        });
        alert("Profil uspješno ažuriran!");
      } catch (error) {
        console.error("Greška prilikom ažuriranja profila: ", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteAccount() {
      const user = auth.currentUser;
      const userEmail = user.email;
      const userDocByEmail = doc(db, "Users", userEmail);
      const userDocByUID = doc(db, "Users", user.uid);
      try {
        // First delete the user document from Firestore by email
        await deleteDoc(userDocByEmail);
        // Then delete the user document from Firestore by UID
        await deleteDoc(userDocByUID);
        // Then delete the user from Firebase Authentication
        await deleteUser(user);
        alert("Račun uspješno uklonjen.");
        this.$router.push("/register");
      } catch (error) {
        console.error("Greška prilikom uklanjanja računa: ", error);
        if (error.code === 'auth/requires-recent-login') {
          alert("Za brisanje računa potrebna je ponovna prijava.");
          // Handle the re-login process here
        }
      }
    },
  },
};
</script>

<style scoped>
.purple-background {
    background-color: rgb(159, 132, 256); /* Ljubičasta boja */
}
</style>