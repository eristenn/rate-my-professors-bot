require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const rmp = require("ratemyprofessor-api");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const userColleges = new Map();

client.once("ready", () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const [cmd, ...args] = message.content.trim().split(/\s+/);

    if (cmd === "/searchcollege") {
        const query = args.join(" ");
        const schools = await rmp.searchSchool(query);
        if (!schools || schools.length === 0) return message.reply("❌ No matching colleges found.");
        return message.reply(
            schools.slice(0, 10).map((s) => `**${s.node.name}**`).join("\n")
        );
    }

    if (cmd === "/setcollege") {
        const collegeName = args.join(" ");
        const schools = await rmp.searchSchool(collegeName);
        if (!schools || schools.length === 0) return message.reply("❌ College not found.");
        const school = schools[0].node;
        userColleges.set(message.author.id, school);
        return message.reply(`✅ Your college has been set to **${school.name}**`);
    }

    if (cmd === "/clearcollege") {
        userColleges.delete(message.author.id);
        return message.reply("🗑️ Your college preference has been cleared.");
    }

    if (cmd === "/professor") {
        const school = userColleges.get(message.author.id);
        if (!school) return message.reply("❗ Please set your college first with `/setcollege`.");
        const profName = args.join(" ");
        const profs = await rmp.searchProfessorsAtSchoolId(profName, school.id);
        const prof = profs.find(p => `${p.node.firstName} ${p.node.lastName}`.toLowerCase() === profName.toLowerCase())?.node;
        if (!prof) return message.reply("🚫 Professor not found.");
        return message.reply(
            `**${prof.firstName} ${prof.lastName}** – ${school.name}\n` +
            `⭐ Rating: ${prof.avgRating}\n` +
            `🎓 Difficulty: ${prof.avgDifficulty}\n` +
            `📊 Would Take Again: ${prof.wouldTakeAgainPercent || "N/A"}%\n` +
            `📝 Num Ratings: ${prof.numRatings}`
        );
    }

    if (cmd === "/topprofessors") {
        const school = userColleges.get(message.author.id);
        if (!school) return message.reply("❗ Please set your college first with `/setcollege`.");
        const profs = await rmp.getTopProfessorsAtSchoolId(school.id);
        if (!profs.length) return message.reply("🚫 No top professors found.");
        return message.reply(
            profs.slice(0, 5).map(p =>
                `**${p.firstName} ${p.lastName}** – ⭐ ${p.avgRating} • 🎓 ${p.department} • Votes: ${p.numRatings}`
            ).join("\n")
        );
    }

    if (cmd === "/compare") {
        const school = userColleges.get(message.author.id);
        if (!school) return message.reply("❗ Please set your college first with `/setcollege`.");
        const [name1, name2] = args.join(" ").split(",");
        if (!name1 || !name2) return message.reply("Usage: /compare Prof1, Prof2");

        const [p1, p2] = await Promise.all([
            rmp.searchProfessorsAtSchoolId(name1.trim(), school.id),
            rmp.searchProfessorsAtSchoolId(name2.trim(), school.id),
        ]);

        const prof1 = p1.find(p => `${p.node.firstName} ${p.node.lastName}`.toLowerCase() === name1.trim().toLowerCase())?.node;
        const prof2 = p2.find(p => `${p.node.firstName} ${p.node.lastName}`.toLowerCase() === name2.trim().toLowerCase())?.node;

        if (!prof1 || !prof2) return message.reply("🚫 One or both professors not found.");

        return message.reply(
            `**${prof1.firstName} ${prof1.lastName}** vs **${prof2.firstName} ${prof2.lastName}** at ${school.name}\n` +
            `⭐ Rating: ${prof1.avgRating} vs ${prof2.avgRating}\n` +
            `🎓 Difficulty: ${prof1.avgDifficulty} vs ${prof2.avgDifficulty}\n` +
            `📊 Would Take Again: ${prof1.wouldTakeAgainPercent || 'N/A'}% vs ${prof2.wouldTakeAgainPercent || 'N/A'}%\n` +
            `📝 Num Ratings: ${prof1.numRatings} vs ${prof2.numRatings}`
        );
    }
});

client.login(process.env.DISCORD_TOKEN);
