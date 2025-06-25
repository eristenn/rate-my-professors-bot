# 🎓 RateMyProfessors Bot

A Discord bot built with **Node.js** and **Discord.js**, made to help students find, compare, and explore professor ratings from [RateMyProfessors.com](https://www.ratemyprofessors.com/). Users can select their college, search for professors, view ratings, and compare professors directly within Discord.

---

## 🚀 Features

- 🔍 `/searchcollege [query]` — Search for a list of colleges by keyword
- 🎓 `/setcollege [College Name]` — Set your preferred college (required for all professor lookups)
- ❌ `/clearcollege` — Clears your selected college
- 👨‍🏫 `/professor [Full Name]` — View rating, difficulty, and reviews of a specific professor
- 🌟 `/topprofessors` — Displays top-rated professors (by RMP rating) at your selected college
- ⚖️ `/compare [Prof A], [Prof B]` — Compare two professors side-by-side

---

## 🛠️ Tech Stack

| Layer           | Tool                          |
|----------------|-------------------------------|
| Bot Framework   | [discord.js](https://discord.js.org) |
| Professor Data  | [ratemyprofessor-api](https://www.npmjs.com/package/ratemyprofessor-api) |
| Config Handling | dotenv                        |
| Language        | JavaScript (Node.js)          |

---

## 📦 Setup Instructions

1. **Clone the Repo**
```bash
git clone https://github.com/eristenn/rate-my-professors-bot.git
cd professor-finder-bot-js
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Create a `.env` file:
```
DISCORD_TOKEN=your-bot-token-here
```

4. **Run the Bot**
```bash
node index.js
```

---

## Uninstallation

Delete `node_modules` and the lock file
```bash
rm -rf node_modules package-lock.json
```

Uninstall globally installed packages
```bash
npm uninstall -g ratemyprofessor-api
```
---

## 🧪 Example Commands

```
/searchcollege harvard
/setcollege Harvard University
/professor John Smith
/topprofessors
/compare Jane Doe, John Smith
/clearcollege
```

---

## 🧠 Future Enhancements

- Persist user college preferences with a database
- Add support for fuzzy name matching
- Add reaction-based rating summaries
- Web dashboard for college analytics

---

## 📄 License

MIT License. See `LICENSE`.

---

## 👨‍💻 Author

**Your Name**  
GitHub: [@eristenn](https://github.com/eristenn)

---

