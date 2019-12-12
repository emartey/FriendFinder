const friends = require("../data/friends.js");
const friendsArray = friends.friends;

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });

    app.post("/api/friends", function (req, res) {
        const newCat = req.body;
        const newScores = newCat.answers;
        const differences = [];
        const cats = [];
        friendsArray.forEach(function (cat) {
            const matchScores = cat.answers;
            let totalDifference = 0;
            for (let i = 0; i < matchScores.length; i++) {
                totalDifference += Math.abs(matchScores[i] - newScores[i]);
            }
            differences.push(totalDifference);
            differences.sort();
            bestScore = differences[0];
            cats.push({ name: cat.name, photoURL: cat.photoURL, difference: totalDifference });
        });
        const bestMatch = cats.find(function (element) {
            return element.difference === bestScore;
        });
        friendsArray.push(newCat);
        res.json(bestMatch);
    });
};