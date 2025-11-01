// ======== BACKEND : server.js ========

const express = require("express");
const cors = require("cors"); // ✅ Required for frontend-backend connection
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors()); // ✅ This line is essential
app.use(express.json());

const db = new sqlite3.Database("travel.db");


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      currency TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_id INTEGER,
      name TEXT,
      image_url TEXT,
      entry_fee REAL,
      FOREIGN KEY(country_id) REFERENCES countries(id)
  )`);
});

// ====== COUNTRY DATA (20 COUNTRIES) ======
const sampleData = {
  "India": {
    currency: "Rupee (₹)",
    places: [
      ["Taj Mahal", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSE827p309EFve8eW6xuUq8sZXox40EJMsmA&s", 10],
      ["Red Fort","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLrig3jo_utKSgx2MM5vVXU2vDoysSPYpcg&s", 6],
      ["Gateway of India", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD43NkdcHXdZOzv75bUu-ef78cC72cTVoCaQ&s", 5],
      ["Hampi", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMrrn-P1xDLKIOFDfNwWQOl4jw3gMzQ3kJw&s", 8],
      ["Qutub Minar", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRkrbEus0F1dr8WBR78Vflbnn0UlvrISJxag&s", 7]
    ]
  },
  "USA": {
    currency: "US Dollar ($)",
    places: [
      ["Statue of Liberty", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetBIABg2TNuHfJDhT0ein2ZzEXcjAStEtOg&s", 20],
      ["Grand Canyon", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMzfn1hSaHCkLA3GgWXBGtJCyX555bUekqA&s", 25],
      ["Yellowstone", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4HINSmgMxNblrJ6N4DmzG7uJusc4_-Plj7w&s", 15],
      ["Disney World", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2v2BAQxpYW4r8kE9_bn3YjoFJw-cgx0_1A&s", 40],
      ["Times Square", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInwwhAzQWc_trFauIPg24N-HjkYsqakd6kg&s", 0]
    ]
  },
  "France": {
    currency: "Euro (€)",
    places: [
      ["Eiffel Tower", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1KnzpN_caNwOkUMhJMsZIvNBLjRAT7FVsg&s", 25],
      ["Louvre Museum", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqsFXVRGwN6g9mII8pzJsQ_1h-ZTC8WsW6A&s", 15],
      ["Notre Dame", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfS-r70G_nQIsCH9WHmwujNfzeQjkwKBNxSA&s", 10],
      ["Versailles", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdydVZDBlEtlaIX_QJc03f_v1zTXQIS766w&s", 20],
      ["Mont Saint-Michel", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzwECEcncs1GMyZb4MdrFJL5ljTq-sEL4RQ&s", 18]
    ]
  },
  "Japan": {
    currency: "Yen (¥)",
    places: [
      ["Mount Fuji", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRFJSS8FMGR7LiwKcBqpvlyD0il2_Guwjlw&s", 12],
      ["Tokyo Tower", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKPksSvvVa-yjRHBpuBbwHAmdjT3n0ykuabg&s", 10],
      ["Osaka Castle", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt7q3-AghhQr4FntcVwHR7Q0htqvaIJTzDcg&s", 8],
      ["Kyoto Temple", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbUjn1lz24GRwcJFog-9DFN-6UuEsuXZ1M9A&s", 9],
      ["Hiroshima Park", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoxtCqGQephDqfhNFRy6NvpSy89F4_qJ-pEQ&s", 5]
    ]
  },
  "Italy": {
    currency: "Euro (€)",
    places: [
      ["Colosseum", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVDIbhBSpVPY7trnBrPLgO3jfsCPw1EGUkg&s", 18],
      ["Venice Canals", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqI6rcFISWkla052aa1T7cPcdj6KJ3WrM9Sw&s", 15],
      ["Leaning Tower of Pisa", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBtZHiwzkTv6gFzXkOlbZ1l-L_MrdTso6ctQ&s", 10],
      ["Florence Cathedral", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2jsLkPD4UPLLYAcZqUNJobIzv-2A5av6dFg&s", 8],
      ["Pompeii", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lpQVGbO-gCzYO0oLT__bclhMIcNVVDBZEw&s", 12]
    ]
  },
  "Germany": {
    currency: "Euro (€)",
    places: [
      ["Brandenburg Gate", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEC_MFdr5VU_l8QsYhnyymsfxbrrkue6R8gQ&s", 5],
      ["Neuschwanstein Castle", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpWVIcaVGCxEPAPqE8wJFhbXmUCUnGJ7wbuQ&s", 15],
      ["Berlin Wall", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhK3Fmlb_ikTOQDypVp4Y5hXqn80tXJGko2w&s", 0],
      ["Cologne Cathedral", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgC_HXuDE6PL4OkB7zGxQls43DfxjPaVSuoA&s", 6],
      ["Black Forest", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bSOBlcm1C2yGuzNMyLipSrsn-Danyq5JoQ&s", 4]
    ]
  },
  "Australia": {
    currency: "Australian Dollar (A$)",
    places: [
      ["Sydney Opera House", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2wWN3WyCka4rkDMqqylJPGzcsYaKsZs8hrw&s", 25],
      ["Great Barrier Reef", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8PbT66cTf7eSO9iylaXXHDbis0U6KGWQ7vw&s", 30],
      ["Uluru", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1RCOtaw398ZOpadCbJqa5SQjG00CviabIA&s", 10],
      ["Bondi Beach", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBECptjKBHtGiwMMuUH6QxkpgM4RYc7iKQ7w&s", 0],
      ["Kangaroo Island", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF44Wc60jAXyYYIgHmGE9b_QLk3qucrWS04w&s", 15]
    ]
  },
  "Canada": {
    currency: "Canadian Dollar (C$)",
    places: [
      ["Niagara Falls", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0xBZHInK96IQkE6E6uSbx6tkXCkY09RrNQ&s", 10],
      ["Banff National Park", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXTKNTeUHF63sJD62U8vthkOTkcX23DeIpMQ&s", 20],
      ["CN Tower", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyv_obYEXF7DexvhPLKkWAig8w_0fjf_z0Gw&s", 15],
      ["Old Quebec", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuguCC1jZM8JzjhYP4ykcH9pPLQcCJK5YytQ&s", 5],
      ["Whistler", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqPyYkF2mNyv-gqbJKwW4x8n1sEvaALNejg&s", 8]
    ]
  },
  "China": {
    currency: "Yuan (¥)",
    places: [
      ["Great Wall", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDjZrV1NnrBAGvaNSwhaWveTwwM17y8o_Mw&s", 20],
      ["Forbidden City", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLczlVdH-64jLTkBHLt2NdxaqpSDz0NJnNw&s", 15],
      ["Terracotta Army", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJYCoaanOl4Ijy1hddl74Ed_hfHOonjdtfA&s", 18],
      ["Shanghai Tower", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvrD8lAftmorX1tR8XihTs6OX3OY1LhDtdng&s", 22],
      ["Summer Palace", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAispSFiCS7ZJ04d7XDKNlBGKRNcABr2Q9IA&s", 10]
    ]
  },
  "UK": {
    currency: "Pound (£)",
    places: [
      ["Big Ben", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtTZsn-UoOQKwc9vKsMVHJnXfQcM_pfC-dA&s", 0],
      ["Buckingham Palace", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9p_5G5djEWLjEW5f6tM142HS4n9Mn4R-HLA&s", 15],
      ["Stonehenge", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQYus-5Yu7YGYHPHYuXusyyx4k75EGI5OIg&s", 12],
      ["London Eye", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfxw_vl92xL5n2N_TlJiKKEYahppr2ovY1zA&s", 25],
      ["Tower Bridge", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFxAhxNzkhIKTow5WNgow_ZBqCPuEeCEuiA&s", 10]
    ]
  },
  "Brazil": {
    currency: "Real (R$)",
    places: [
      ["Christ the Redeemer", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvdnfV-GYuHLwhQZZRn___fEz0_5kHe0011A&s", 10],
      ["Sugarloaf Mountain", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1pjlKgwYba2k9U03dYdk1MrvO62VnfgNuw&s", 15],
      ["Copacabana Beach", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwjrYdC3ZzpglTXluVgwWb41uSlKDPGP9GA&s", 0],
      ["Iguazu Falls", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRTCjbkDkXz3IOQpfmW9UyJUqdMfUxwGhlg&s", 20],
      ["Amazon Rainforest", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H1cWcQL7qeB4vhb-0gUx-XU8gri6HDje-Q&s", 12]
    ]
  },
  "Russia": {
    currency: "Ruble (₽)",
    places: [
      ["Red Square", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6FMjl_QVkr9NSKkZBP5BBa_5jNFdyTNfaA&s", 5],
      ["Kremlin", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITuLRERhd5d_UNPcPh4MiZFIj9FB8OqqLKw&s", 12],
      ["Lake Baikal", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnW_3TSbuAwQqxeXpaelWdk5qFmOlhKsoJQ&s", 10],
      ["Hermitage Museum", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xlubl0_cZ9IRaOIRsj4f-8FLb4mAV-k10w&s", 15],
      ["Saint Basil's Cathedral", "https://momentaryawe.com/wp-content/uploads/2010/02/st_basil_cathedral.jpg", 8]
    ]
  },
  "South Korea": {
    currency: "Won (₩)",
    places: [
      ["Gyeongbokgung Palace", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eSIJ7eb-Vy6jFSut-tlwGiNAssKhvwmFCA&s", 5],
      ["Jeju Island", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1RuGeUNqLBL4vaIAZM6sE4Gi44X-xdxvYKg&s", 12],
      ["Namsan Tower", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3gtcBOAKt-HDhZWmhTnqt7XQBK83xKeOVg&s", 7],
      ["Bukchon Hanok Village", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4dQ_kQ54RVS_4-LgWwSNQeYRggZW5TmdbeQ&s", 0],
      ["Busan Beach", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TSI5WWNCvHlb5ISp9xZQA7ilHERbmxJiUA&s", 8]
    ]
  },
  "Singapore": {
    currency: "Singapore Dollar (S$)",
    places: [
      ["Marina Bay Sands", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEZrrkeT6hLzxvvv2nJWtCUBvAA46Mi14Ng&s", 20],
      ["Gardens by the Bay", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttoc-WHYVhu-c3qn5MJpdvWO5V1CV6jFZ1w&s", 15],
      ["Sentosa Island", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6fAJpCIub13-Tjqgg_IMkyJPYsMCegYTL-A&s", 10],
      ["Universal Studios", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlYrZHEHV7vOLG1Xq72p2RmTkLiOvytE9T0Q&s", 30],
      ["Merlion Park", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQmPNKSLqTv-L7G9QKR8qB4gObviogttZS1g&s", 0]
    ]
  },
  "UAE": {
    currency: "Dirham (AED)",
    places: [
      ["Burj Khalifa", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PLB8jykxJvd5W4ygOw-1QeVYGZBPu9AFAQ&s", 25],
      ["Dubai Mall", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSilEspyUsc1jsyho14oTymFVXhN6QeTfwnvg&s", 0],
      ["Palm Jumeirah", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MCDI_T-SGCVBxalCNLfSb20drS36fRmk2Q&s", 15],
      ["Sheikh Zayed Mosque", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGpsaq44yOba01okx-k35DMc5yriTcZqD_Q&s", 5],
      ["Desert Safari", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SbFb54ty4TOjgaQm723fCMsf0KDNArXeXw&s", 20]
    ]
  },
  "Egypt": {
    currency: "Egyptian Pound (E£)",
    places: [
      ["Pyramids of Giza", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4mRviElzkV5hCK_Y1rWvmH_ofkHxr4ZUE6Q&s", 10],
      ["Nile River Cruise", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl22U-I1A9iWcEb-4eOio8hMKanTIoSC4-Ig&s", 12],
      ["Luxor Temple", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKV-zBrxGKx7s7-WNG-L6iRdoc9xuBVJT_A&s", 8],
      ["Valley of the Kings", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzFbIEyveE3EV6Aw2DcohhHev8EJkAsBJ5A&s", 9],
      ["Cairo Museum", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTV2jRNF0ptghNuctsk1MVdJiMECVqRRB8eA&s", 7]
    ]
  }
};

// ====== INSERT DATA ONCE ======
db.get("SELECT COUNT(*) AS count FROM countries", (err, row) => {
  if (row.count === 0) {
    for (const [country, info] of Object.entries(sampleData)) {
      db.run("INSERT INTO countries (name, currency) VALUES (?, ?)", [country, info.currency], function () {
        const countryId = this.lastID;
        info.places.forEach(([name, image, fee]) => {
          db.run("INSERT INTO places (country_id, name, image_url, entry_fee) VALUES (?, ?, ?, ?)",
            [countryId, name, image, fee]);
        });
      });
    }
    console.log("🌎 All sample data inserted successfully!");
  }
});

// ====== ROUTES ======
app.get("/countries", (req, res) => {
  db.all("SELECT * FROM countries", (err, rows) => res.json(rows));
});

app.get("/places/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT name, currency FROM countries WHERE id=?", [id], (err, country) => {
    db.all("SELECT * FROM places WHERE country_id=?", [id], (err2, places) => {
      res.json({ country, places });
    });
  });
});

app.listen(4000, () => console.log("✅ Backend running at http://localhost:4000"));

