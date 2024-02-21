<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none"
          >Career Connect</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-show="!isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-show="!isAuthenticated" text to="/register">Register</v-btn>
      <v-btn v-show="isAuthenticated" @click.prevent="signOut()">LogOut</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {
  db,
  auth,
  getAuth,
  getDoc,
  onAuthStateChanged,
  signOut,
  doc,
} from "@/firebase";

export default {
  data: () => ({
    group: null,
    isAuthenticated: false,
    isAuthorized: false,
    mail: "User not loged in!",
  }),

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(db, "Users", user.email)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data()["Email"]);
            this.mail = docSnap.data()["Email"];
          } else {
            console.log("No such document!");
          }
        });
        //this.mail = auth.currentUser.email;
      } else {
        this.email = "User in not loged in";
      }
    });
  },

  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("signed out");
          this.$router.push({ path: "/Login" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        console.log("Prijavljen");
        this.isAuthenticated = true;
      } else {
        console.log("Nema prijave");
        this.isAuthenticated = false;
      }
    });
  },
};
</script>
