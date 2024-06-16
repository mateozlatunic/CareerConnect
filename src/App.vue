<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none"
          >Career Connect</router-link
        >
      </v-toolbar-title>
      <div>&nbsp; | <v-btn text to="/aboutUs" class="white--text text-decoration-none">About Us</v-btn> &nbsp;</div>

      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        &nbsp; {{ mail }} | &nbsp;
      </div>
      <v-btn v-show="!isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-show="!isAuthenticated" text to="/register">Register</v-btn>
      <v-btn v-show="isAuthenticated" text to="/profile">Profile</v-btn>
      <v-btn v-show="isAuthenticated" @click.prevent="signOut">LogOut</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { auth, getAuth, onAuthStateChanged, signOut, doc, getDoc, db } from "@/firebase";

export default {
  data: () => ({
    isAuthenticated: false,
    mail: "status: neprijavljen korisnik",
  }),

  mounted() {
    this.checkAuthState();
  },

  methods: {
    checkAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.isAuthenticated = true;
          this.mail = user.email; // Use the email directly from the user object
          const userDoc = await getDoc(doc(db, "Users", user.email));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.mail = userData.Email || user.email; // Fallback to user's email if "Email" field is not found
          } else {
            console.log("No such document!");
          }
        } else {
          this.isAuthenticated = false;
          this.mail = "status: neprijavljen korisnik";
        }
      });
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("signed out");
          this.$router.push({ path: "/login" });
          location.reload();
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

<style scoped>
.profilna {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>