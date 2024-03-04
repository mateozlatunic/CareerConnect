<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Profil</v-card-title>
      <v-card-text>
        <input
          :rules="[rules.required]"
          class="butot"
          type="file"
          ref="PictureFile"
        />

        <v-spacer style="margin-bottom: 10px; margin-top: 20px"></v-spacer>

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
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
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

<!--
        <v-btn
          :disabled="!form"
          :loading="isLoading"
          color="primary"
          type="button"
          @click="UploadImageToStorage()"
          >Registriraj se</v-btn
        >
 -->
 
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveChanges">Spremi</v-btn>
        <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  doc,
  auth,
  db,
  setDoc,
  ref,
  getDownloadURL,
  storage,
  uploadBytes,
} from "@/firebase";

export default {
  name: "Profile",
  data: () => {
    return {
      dialog: false,
      editedName: null,
      editSurname: null,
      editEmail: null,
      editPassword: null,
      confirmPassword: null,
      form: false,
      profilnaURL: "",
      isLoading: false,
      editTelephone: null,
      editInterest: null,
      editCompanyName: null,
      editCompanyAddress: null,
      editDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      rules: {
        email: (v) => !!(v || "").match(/@/) || " Unesi email",
        length: (len) => (v) => (v || "").length >= len || `${len}`,
        password: (v) =>
          !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).*$/) ||
          "Lozinka mora sadržavati slova i brojeve",
        required: (v) => !!v || "Potrebno popuniti polje",
        telephoneNumber: (v) => (!!v && v.length === 10) || "Unesi 10 brojeva",
      },
    };
  },

  methods: {
    saveChanges() {
      editedName,
        editSurname,
        editEmail,
        editPassword,
        profilnaURL,
        editTelephone,
        editInterest,
        editCompanyName,
        editCompanyAddress,
        editDate;
      // Implement logic to save changes to Firebase
      // You can use Firebase SDK methods to update user profile data
      // For example, you can use Firestore's update method to update the user's document
      // This method will be called when the user clicks "Save Changes" button
    },

    closeDialog() {
      this.dialog = false;
    },

    async UploadImageToStorage() {
      if (this.$refs.PictureFile.files[0]) {
        const storageRef = ref(
          storage,
          "Users/" + this.email + "/Profilna-Slika/" + "Profilna"
        );

        await uploadBytes(storageRef, this.$refs.PictureFile.files[0])
          .then((snapshot) => {
            console.log("Upload complete!");

            getDownloadURL(snapshot.ref)
              .then((url) => {
                this.profilnaURL = url;
                this.signup();
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else if (!this.$refs.PictureFile.files[0]) {
        this.profilnaURL = this.defaultURL;
        this.signup();
      }
    },
  },
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
