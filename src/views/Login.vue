<template>
  <v-main class="purple-background"> <!-- Promijenio sam v-main u v-app -->
      <v-container class="purple-background" style="margin-bottom: 340px">
        <v-row justify="center" class="purple-background" style="padding-top: 0px">
          <v-col cols="12" sm="8" md="6">
            <v-card class="cardColor">
              <v-card-title class="headline">Prijava</v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="form">
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
                    label="Lozinka"
                    type="password"
                    required
                  ></v-text-field>

                  <v-btn
                    color="primary"
                    :disabled="!form"
                    :loading="isLoading"
                    @click="login()"
                    >Prijavi se</v-btn
                  >
                  <v-btn to="/register" text>Nemaš račun?</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
</template>

<script>
import { auth, signInWithEmailAndPassword } from "@/firebase";

export default {
  name: "Login",
  data: () => ({
    email: null,
    form: false,
    isLoading: false,
    password: null,
    rules: {
      email: (v) => !!(v || "").match(/@/) || " Unesi email",
      length: (len) => (v) => (v || "").length >= len || `${len}`,
      password: (v) =>
        !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).*$/) ||
        "Lozinka mora sadržavati slova i brojeve",
      required: (v) => !!v || "Potrebno popuniti polje",
    },
  }),

  methods: {
    login() {
      let email = this.email;
      signInWithEmailAndPassword(auth, email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("Pogrešna lozinka ili e-mail!");
        });
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
}

.purple-background {
  background-color: rgb(159, 132, 256); /* Ljubičasta boja */
}

.cardColor {
  background-color: rgb(216, 235, 255);
}
</style>
