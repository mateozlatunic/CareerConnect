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

      <v-row class="job-info-row" v-if="selectedJob">
        <!-- Kartica sa slikom/logom -->
        <v-col cols="12" sm="4" md="3">
          <v-card class="mx-auto cardColor" max-width="300">
            <v-img
              class="align-end text-white"
              height="200"
              :src="selectedJob.image"
              contain
            ></v-img>
          </v-card>
        </v-col>

        <!-- Kartica sa sadržajem posla -->
        <v-col cols="12" sm="8" md="9">
          <div class="card" style="background-color: white">
            <div>
              <h2>{{ selectedJob.employer }}</h2>
              <p>
                Kategorija: <i>{{ selectedJob.category }}</i>
              </p>
              <p>
                Radno mjesto: <i>{{ selectedJob.workplace }}</i>
              </p>
              <p>
                Rok prijave: <i>{{ selectedJob.deadline }}</i>
              </p>
              <p>
                Plaća: <i>{{ selectedJob.salary }}</i>
              </p>
              <p>
                Opis posla: <i>{{ selectedJob.jobDescription }}</i>
              </p>
              <p>
                Vrsta posla: <i>{{ selectedJob.jobType }}</i>
              </p>
              <p>
                Županija: <i>{{ selectedJob.county }}</i>
              </p>
              <p>
                Potrebne vještine: <i>{{ selectedJob.skills }}</i>
              </p>
              <p>
                Jezici: <i>{{ selectedJob.language }}</i>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- O poslu -->
      <v-row class="job-info-row" v-if="selectedJob">
        <v-col cols="12">
          <div class="card" style="background-color: white">
            <h2>O poslu:</h2>
            <ul style="margin-left: 25px">
              <li v-for="item in selectedJob.jobDetails.aboutJob" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <!-- Nudimo Vam -->
      <v-row class="job-info-row" v-if="selectedJob">
        <v-col cols="12">
          <div class="card" style="background-color: white">
            <h2>Nudimo Vam:</h2>
            <ul style="margin-left: 25px">
              <li v-for="item in selectedJob.jobDetails.weOffer" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <!-- Od Vas Očekujemo -->
      <v-row class="job-info-row" v-if="selectedJob">
        <v-col cols="12">
          <div class="card" style="background-color: white">
            <h2>Od Vas Očekujemo:</h2>
            <ul style="margin-left: 25px">
              <li
                v-for="item in selectedJob.jobDetails.expectations"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <!-- Job Information View -->
      <v-row justify="center" class="form-row" v-if="user">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-5 cardColor">
            <v-card-title class="headline">
              Podaci za poslodavca |
              {{ selectedJob ? selectedJob.employer : "" }}
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm" class="form-content">
                <v-text-field v-model="ime" label="Ime" required></v-text-field>
                <v-text-field
                  v-model="prezime"
                  label="Prezime"
                  type="text"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[rules.email, rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="kontakt"
                  label="Kontakt (mob)"
                  type="tel"
                  :rules="[rules.telephoneNumber, rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="adresa"
                  label="Adresa"
                  type="text"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="mjesto"
                  label="Mjesto stanovanja"
                  type="text"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="naziv"
                  label="Naziv posla"
                  type="text"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="zivotopis"
                  label="Životopis (pdf)"
                  accept=".pdf"
                  required
                ></v-file-input>
                <v-card-title class="headline">Opcionalno</v-card-title>
                <v-card class="optional-rating-card">
                  <v-row class="d-flex align-center">
                    <v-col cols="12" md="4">
                      <div style="margin-left: 10px">Ocijenite poslodavca:</div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-rating
                        v-model="rating"
                        color="yellow darken-3"
                        background-color="yellow darken-3"
                        half-increments
                      ></v-rating>
                    </v-col>
                  </v-row>
                </v-card>
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
      <v-row justify="center" v-else>
        <v-col cols="12" sm="8" md="6">
          <v-alert type="error" dismissible>
            Morate biti prijavljeni da biste poslali podatke poslodavcu.
          </v-alert>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="3000" top centered>
        {{ snackbarText }}
        <v-btn
          color="black"
          text
          @click="snackbar = false"
          style="margin-left: 10px"
          >Zatvori</v-btn
        >
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Job",
  data() {
    return {
      selectedJob: null,

      // Opis svakog posla posebno
      jobs: [
        {
          image:
            "https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-preview.jpg",
          employer: "Mc'Donalds Inc.",
          category: "Turizam i ugostiteljstvo",
          workplace: "Varaždin",
          deadline: "25.7.2024",
          salary: "800€",
          jobDescription:
            "Rad oko blagajne, priprema hrane, posluživanje kupaca i čišćenje radnog prostora",
          jobType: "Stalni radni odnos",
          county: "Varaždinska",
          skills: "Rad u timu, komunikacijske vještine",
          language: "Hrvatski, engleski",
          jobDetails: {
            aboutJob: [
              "priprema i posluživanje ukusnih burgera, pomfrita i ostalih McDonald's specijaliteta našim gostima",
              "održavanje čistoće i higijene na radnom mjestu i u restoranu",
              "rad na blagajni i obračunavanje narudžbi",
              "pružanje prijateljske i uslužne usluge našim gostima",
              "pobrinuti se da naši gosti imaju ugodno i zadivljujuće iskustvo",
            ],
            weOffer: [
              "Organizirane i zabavne obuke za nove zaposlenike",
              "Mogućnost napredovanja i razvoja karijere unutar McDonald'sa",
              "Fleksibilno radno vrijeme koje odgovara studentima",
              "Konkurentnu plaću i dodatne bonuse",
              "Mogućnost rada u timu i upoznavanje novih ljudi",
              "Rad u dinamičnom i uzbudljivom okruženju",
            ],
            expectations: [
              "Da si motiviran/a i željan/a raditi",
              "Da imaš dobru komunikaciju i timski duh",
              "Da ćeš biti odgovoran/na po pitanju svojih obaveza",
              "Da si pouzdan/a i da ti se može vjerovati",
              "Da ti je rad s ljudima i pružanje izvrsne usluge zabavno",
            ],
          },
        },
        {
          image:
            "https://www.supernova-gardenmall.hr//fileadmin/shared/logos/Pepco.png",
          employer: "Pepco",
          category: "Trgovina",
          workplace: "Karlovac",
          deadline: "20.6.2024",
          salary: "850€",
          jobDescription:
            "Prodaja tekstila, kućnih potrepština i dekorativnih predmeta, savjetovanje kupaca i održavanje urednosti trgovine.",
          jobType: "Puno/Nepuno radno vrijeme",
          county: "Karlovačka",
          skills: "Poznavanje asortimana, komunikacijske vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "rad u dinamičnom timu i doprinos izvrsnoj usluzi kupcima",
              "izlaganje robe, briga o zalihama i održavanje urednosti prodajnog prostora",
              "pružanje pomoći kupcima pri odabiru proizvoda i odgovaranje na njihova pitanja",
              "rad na blagajni i obračunavanje transkacija",
              "održavanje higijene i čistoće na radnom mjestu",
            ],
            weOffer: [
              "mogućnost rada na puno ili nepuno radno vrijeme, fleksibilno u skladu s tvojim potrebama",
              "organizirane treninge i edukacije za nove zaposlenike",
              "mogućnost napredovanja i razvoja karijere u okviru firme",
              "rad u mladom i dinamičnom kolektivu",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za prijevoz",
              "popuste na kupnju PEPCO proizvoda",
            ],
            expectations: [
              "motiviranost i želja za radom",
              "dobru omunikaciju i timski duh",
              "odgovornost i pouzdanost da ti se može vjerovati",
              "da si spreman/a učiti i raditi u brzom tempu",
              "iskustvo rada u trgovini je prednost, ali nije nužno",
            ],
          },
        },
        {
          image:
            "https://cdn.aiidatapro.net/media/90/b7/dd/t780x490/90b7ddfd52bd306d8707cb838e0787bd.jpg",
          employer: "Studenac",
          category: "Trgovina",
          workplace: "Umag",
          deadline: "15.7.2024",
          salary: "800€",
          jobDescription:
            "Rad na blagajni, izdavanje računa, naplata robe i pružanje informacija kupcima.",
          jobType: "Puno radno vrijeme",
          county: "Istarska",
          skills: "Rad na blagajni, komunikacijske vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "izlaganje robe te briga o rokovima, cjenovnom označavanju i popunjenosti odjela",
              "pružanje izvrsne usluge našim kupcima na svježim odjelima",
              "rad na blagajni",
              "kontrola kvalitete i svježine proizvoda te roka trajanja robe",
              "održavanje urednosti prodajnog mjesta",
            ],
            weOffer: [
              "organizirane obuke za nove zaposlenike",
              "novčani bonus za realiziranu preporuku novih kandidata",
              "mogućnost dodatne zarade kroz transparentan sustav bonusa",
              "mogućnost dobivanja dodatne mjesečne plaće kroz poseban program nagrada-Najbolja prodavaonica mjeseca",
              "mogućnost rada na puno ili nepuno radno vrijeme",
              "mogućnost napredovanja, interne promocije",
              "po želji, mogućnost putovanja i prilika za rad u drugim gradovima RH uz osiguran smještaj",
              "dodatno plaćen rad nedjeljom",
              "naknada za prijevoz",
              "božićnica, uskrsnica, naknada za rođenje djeteta",
              "dar za prvašiće i slobodan dan za prvi dan škole",
              "jubilarne nagrade",
              "zanimljiv, dinamičan i raznolik posao",
              "mogućnost rasta i razvoja unutar kompanije",
            ],
            expectations: [
              "razina obrazovanja SSS",
              "poželjno radno iskustvo na istim ili sličnim poslovima",
              "komunikativnost i sklonost timskom radu",
              "urednost, pouzdanost te predanost poslu",
              "radno iskustvo u trgovini je prednost",
            ],
          },
        },
        {
          image:
            "https://www.mueller.hr/assets/download/33/MuellerUeberBluete4c-2633.jpg",
          employer: "Muller",
          category: "Trgovina",
          workplace: "Pula",
          deadline: "21.5.2024",
          salary: "950€",
          jobDescription:
            "Rad u trgovini, usluživanje kupaca, vođenje blagajne i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Komunikacijske vještine, prodajne vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "rad na dinamičnoj prodajnoj poziciji s izravnim kontaktom s kupcima",
              "izlaganje robe, briga o zalihama i održavanje urednosti prodajnog prostora",
              "pružanje izvrsne usluge kupcima i savjetovanje pri odabiru proizvoda",
              "rad na blagajni i obračun transkacija",
              "održavanje higijene i čistoće na radnom mjestu",
            ],
            weOffer: [
              "mogućnost rada na puno ili nepuno radno vrijeme",
              "konkurentnu satnicu",
              "organizirane treninge i edukacije",
              "mogućnost napredovanja i razvoja karijere u okviru firme",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za prijevoz",
              "popuste na kupnju Müller proizvoda",
            ],
            expectations: [
              "motiviranost i želja za radom",
              "dobru omunikaciju i timski duh",
              "odgovornost i pouzdanost da ti se može vjerovati",
              "da si spreman/a učiti i raditi u brzom tempu",
              "iskustvo rada u trgovini je prednost, ali nije nužno",
            ],
          },
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/768px-Lidl-Logo.svg.png",
          employer: "Lidl",
          category: "Trgovina",
          workplace: "Split",
          deadline: "30.6.2024",
          salary: "850€",
          jobDescription:
            "Odgovornosti uključuju rad na blagajni, punjenje polica, pomoć kupcima i održavanje čistoće u trgovini.",
          jobType: "Puno radno vrijeme",
          county: "Splitsko-dalmatinska",
          skills: "Komunikacijske vještine, rad u timu",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "budite dio dinamičnog tima i doprinesite izvrsnom kupcu iskustvu u našim trgovinama",
              "održavajte police puna i uređene, brinite se o izlaganju robe i rokovima cjenovnog označavanja",
              "pružajte srdačnu i profesionalnu uslugu našim kupcima, budite spremni odgovoriti na njihova pitanja i pomoći im pronaći željene proizvode",
              "rad na blagajni i obračunavanje kupovine",
              "održavajte čistoću i higijenu na radnom mjestu i u trgovini",
            ],
            weOffer: [
              "organizirane treninge i edukacije za nove zaposlenike",
              "konkurentnu studentsku satnicu s mogućnošću dodatne zarade kroz transparentan sustav bonusnih programa",
              "mogućnost rada na puno ili nepuno radno vrijeme, fleksibilno u skladu s studenskim studijima",
              "mogućnost napredovanja i razvoja karijere unutar Lidl Hrvatska",
              "rad u dinamičnom okruženju",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za prijevoz",
              "popuste na kupnju Lidl proizvoda",
              "možnosti dodatnog edukiranja i osposobljavanja",
            ],
            expectations: [
              "motiviranost, marljivost i želju za radom",
              "komunikacijske vještine i timski duh",
              "Da si odgovoran/a, pouzdan/a i da ti se može vjerovati",
              "Da si spreman/a učiti i raditi u brzom tempu",
              "Ispustvo rada u trgovini je prednost, ali nije nužno",
            ],
          },
        },
        {
          image:
            "https://img-cdn.thepublive.com/fit-in/580x0/filters:format(webp)/socialsamosa/media/post_attachments/8beb3f26-145.jpg",
          employer: "Decathlon",
          category: "Sport i rekreacija",
          workplace: "Rovinj",
          deadline: "15.8.2024",
          salary: "900€",
          jobDescription:
            "Savjetovanje kupaca o sportskoj opremi, rad na blagajni i održavanje reda u trgovini.",
          jobType: "Puno radno vrijeme",
          county: "Istarska županija",
          skills: "Poznavanje sportske opreme, komunikacijske vještine",
          language: "Hrvatski, engleski",
          jobDetails: {
            aboutJob: [
              "budi dio sportaške zajednice i doprinesi izvrsnom kupcu iskustvu u našim trgovinama",
              "održavaj police puna opreme i uređene, budi spreman/a pomoći kupcima pronaći željeni sportski artikl",
              "pružaj stručne savjete i informacije o sportskoj opremi i odjeći",
              "budi spreman/a demonstrirati korištenje opreme i dati kupcima savjete za trening",
              "rad na blagajni i obračunavanje kupovine",
              "održavajte čistoću i higijenu na radnom mjestu i u trgovini",
            ],
            weOffer: [
              "organizirane treninge i edukacije za nove zaposlenike o sportskoj opremi i odjeći",
              "konkurentnu studentsku satnicu s mogućnošću dodatne zarade kroz transparentan sustav bonusnih programa",
              "mogućnost rada na puno ili nepuno radno vrijeme, fleksibilno u skladu s studentskim studijima",
              "popuste na kupnju Decathlon opreme i odjeće",
              "mogućnost sudjelovanja u sportskim aktivnostima i programima",
              "rad u mladom i dinamičnom kolektivu",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za pijevoz",
              "možnosti dodatnog edukiranja i osposobljavanja u području sporta",
            ],
            expectations: [
              "razina obrazovanja SSS",
              "poželjno radno iskustvo na istim ili sličnim poslovima",
              "komunikativnost i sklonost timskom radu",
              "urednost, pouzdanost te predanost poslu",
              "radno iskustvo u trgovini je prednost",
            ],
          },
        },
        {
          image:
            "https://logos-world.net/wp-content/uploads/2022/04/Bauhaus-Symbol.png",
          employer: "Bauhaus",
          category: "Trgovina",
          workplace: "Poreč",
          deadline: "10.9.2024",
          salary: "850€",
          jobDescription:
            "Prodaja građevinskog materijala, pomoć kupcima, izrada računa i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska",
          skills: "Poznavanje građevinskih materijala, komunikacijske vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "izlaganje robe te briga o rokovima, cjenovnom označavanju i popunjenosti odjela",
              "pružanje izvrsne usluge našim kupcima na svježim odjelima",
              "rad na blagajni",
              "kontrola kvalitete i svježine proizvoda te roka trajanja robe",
              "održavanje urednosti prodajnog mjesta",
            ],
            weOffer: [
              "organizirane obuke za nove zaposlenike",
              "novčani bonus za realiziranu preporuku novih kandidata",
              "mogućnost dodatne zarade kroz transparentan sustav bonusa",
              "mogućnost dobivanja dodatne mjesečne plaće kroz poseban program nagrada-Najbolja prodavaonica mjeseca",
              "mogućnost rada na puno ili nepuno radno vrijeme",
              "mogućnost napredovanja, interne promocije",
              "po želji, mogućnost putovanja i prilika za rad u drugim gradovima RH uz osiguran smještaj",
              "dodatno plaćen rad nedjeljom",
              "naknada za prijevoz",
              "božićnica, uskrsnica, naknada za rođenje djeteta",
              "dar za prvašiće i slobodan dan za prvi dan škole",
              "jubilarne nagrade",
              "zanimljiv, dinamičan i raznolik posao",
              "mogućnost rasta i razvoja unutar kompanije",
            ],
            expectations: [
              "razina obrazovanja SSS",
              "poželjno radno iskustvo na istim ili sličnim poslovima",
              "komunikativnost i sklonost timskom radu",
              "urednost, pouzdanost te predanost poslu",
              "radno iskustvo u trgovini je prednost",
            ],
          },
        },
        {
          image:
            "https://i.pinimg.com/736x/d3/09/1a/d3091a1a5350fede679b2c7461b0745b.jpg",
          employer: "Tommy Hilfiger",
          category: "Moda",
          workplace: "Karlovac",
          deadline: "20.6.2024",
          salary: "900€",
          jobDescription:
            "Prodaja odjeće i modnih dodataka, pružanje savjeta kupcima i održavanje urednosti trgovine.",
          jobType: "Puno radno vrijeme",
          county: "Karlovačka",
          skills: "Poznavanje modne industrije, komunikacijske vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "budi dio modne ekipe i doprinesi izvrsnom kupcu iskustvu u našim trgovinama",
              "održavaj uređene izloge i vitrine, budi spreman/na pomoći kupcima pronaći željeni odjećni komad",
              "pružaj savjete o stilu i trendovima te kombiniraj odjeću prema željama kupaca",
              "budi spreman/na raditi na blagajni i obračunavati kupovinu",
              "održavajte čistoću i higijenu na radnom mjestu i u trgovini",
            ],
            weOffer: [
              "organizirane treninge i edukacije za nove zaposlenike o modi i stilu",
              "konkurentnu studentsku satnicu s mogućnošću dodatne zarade kroz transparentan sustav bonusnih programa",
              "mogućnost rada na puno ili nepuno radno vrijeme, fleksibilno u skladu s tvojim studijama",
              "popuste na kupnju Tommy Hilfiger odjeće",
              "mogućnost sudjelovanja u modnim događajima i programima",
              "rad u mladom i dinamičnom kolektivu",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za prijevoz",
              "možnosti dodatnog edukiranja i osposobljavanja u području mode",
            ],
            expectations: [
              "razina obrazovanja SSS",
              "poželjno radno iskustvo na istim ili sličnim poslovima",
              "komunikativnost i sklonost timskom radu",
              "urednost, pouzdanost te predanost poslu",
              "radno iskustvo u trgovini je prednost",
            ],
          },
        },
        {
          image:
            "https://pevex.hr/Documents/relative_ckeditor/pevex_logo_zeleno.jpg",
          employer: "Pevex",
          category: "Trgovina",
          workplace: "Poreč",
          deadline: "18.8.2024",
          salary: "850€",
          jobDescription:
            "Asistencija u prodaji kućanskih aparata, pomoć kupcima, izrada računa i održavanje urednosti prodajnog prostora.",
          jobType: "Puno radno vrijeme",
          county: "Istarska",
          skills: "Poznavanje kućanskih aparata, komunikacijske vještine",
          language: "Hrvatski",
          jobDetails: {
            aboutJob: [
              "budi dio dinamičnog tima i doprinesi izvrsnom kupcu iskustvu u našim trgovinama",
              "održavaj police puna i uređene, budi spreman/na pomoći kupcima pronaći željeni proizvod",
              "pružaj savjete o proizvodima i budi upućen/a u ponudu trgovine",
              "budi spreman/na raditi na blagajni i obračunavati kupovinu",
              "održavaj čistoću i higijenu na radnom mjestu i u trgovini",
            ],
            weOffer: [
              "organizirane treninge i edukacije za nove zaposlenike o proizvodima i uslugama",
              "popuste na kupnju PEVEX proizvoda",
              "mogućnost sudjelovanja u promotivnim aktivnostima i programima",
              "rad u dinamičnom kolektivu",
              "godišnji odmor i plaćeni bolesnički dopust",
              "naknada za prevoz",
              "mogućnost dodatnog edukiranja i osposobljavanja u trgovini",
            ],
            expectations: [
              "razina obrazovanja SSS",
              "poželjno radno iskustvo na istim ili sličnim poslovima",
              "komunikativnost i sklonost timskom radu",
              "urednost, pouzdanost te predanost poslu",
              "interesovanje za trgovinu i rad s ljudima je prednost",
            ],
          },
        },
      ],
      ime: "",
      prezime: "",
      email: "",
      kontakt: "",
      adresa: "",
      mjesto: "",
      naziv: "",
      zivotopis: null,
      politika: false,
      rating: 0,
      user: null,
      snackbar: false,
      snackbarText: "",
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Unesi email",
        required: (v) => !!v || "Potrebno popuniti polje",
        telephoneNumber: (v) => (!!v && v.length === 10) || "Unesi 10 brojeva",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // Provjera da li su svi obavezni podaci ispunjeni
        if (
          !this.ime ||
          !this.prezime ||
          !this.email ||
          !this.kontakt ||
          !this.adresa ||
          !this.mjesto ||
          !this.naziv ||
          !this.zivotopis ||
          !this.politika
        ) {
          throw new Error("Molimo ispunite obavezna polja.");
        }

        // Provjera da li je fajl zivotopis postavljen
        if (!this.zivotopis) {
          throw new Error("Molimo priložite životopis.");
        }

        // Objava PDF-a na Firebase Storage
        const pdfFile = this.zivotopis;
        const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
        const snapshot = await uploadBytes(storageRef, pdfFile);
        const pdfUrl = await getDownloadURL(snapshot.ref);

        // Spremanje forme na Firestore
        await addDoc(collection(db, "jobApplication"), {
          ime: this.ime,
          prezime: this.prezime,
          email: this.email,
          kontakt: this.kontakt,
          adresa: this.adresa,
          mjesto: this.mjesto,
          naziv: this.naziv,
          zivotopis: pdfUrl,
          politika: this.politika,
          rating: this.rating,
          timestamp: serverTimestamp(),
        });

        this.snackbarText = "Prijava je uspješno spremljena!";
        this.snackbar = true;

        // Reset forme nakon uspješnog slanja
        this.resetForm();
      } catch (error) {
        console.error("Greška prilikom spremanja prijave: ", error);
        alert(`Greška prilikom spremanja prijave | ${error.message}`);
      }
    },
    resetForm() {
      this.ime = "";
      this.prezime = "";
      this.email = "";
      this.kontakt = "";
      this.adresa = "";
      this.mjesto = "";
      this.naziv = "";
      this.zivotopis = null;
      this.politika = false;
      this.rating = 0;
    },
  },
  created() {
    const jobId = this.$route.params.id;
    this.selectedJob = this.jobs[parseInt(jobId, 10)];
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
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
</style>
