define(['controllers/controller', 'views/UserView', 'models/UserModel', 'lib/request'], function (Controller, UserView, UserModel, request) {

    console.log("it works");
    document.getElementById("title-username").value = "HI THERE";
    document.getElementById("stats-games-played").value = stats[0].totalGames;
    document.getElementById("stats-games-won").value = stats[0].totalWins;
    document.getElementByID("stats-win-percentage").value = stats[0].winPercentage;
    document.getElementById("stats-win-streak") = stats[0].winStreak;
    document.getElementById("stats-rank") = stats[0].rank;
    /////////////////////////////////////////////////////////////////////

    //                        Match History

    ////////////////////////////////////////////////////////////////////
    var match;

    function addMatchHistory() {
        match = {
            userName: document.getElementById("userName_m").value,
            startDate: Date(),
            gameLength: document.getElementById("gameLength").value,
            result: document.getElementById("result").value,
        };

        var post = new XMLHttpRequest();
        post.open("POST", "/matchHistory", true);
        post.setRequestHeader("Content-type", "application/json");
        post.send(JSON.stringify({
            userName: match.userName,
            startDate: match.startDate,
            gameLength: match.gameLength,
            score: data[k].score,
            result: match.result,
        }));
    }

    function getMatchHistory() {
        var x = new XMLHttpRequest();
        x.open("GET", "/matchHistory", true);
        x.send();
        return x;
    }

    function updateMatchHistoryTable(data) {
        if (data == null) {
            return;
        }
        for (var k = 0; k < data.length; k++) {

            var mh = document.getElementById("match-history-div");
            var row = mh.insertRow();
            var col0 = row.insertCell(0);
            var col1 = row.insertCell(1);
            var col2 = row.insertCell(2);
            var col3 = row.insertCell(3);

            col0.innerHTML = ddata[k].startDate;
            col1.innerHTML = data[k].gameLength;
            col2.innerHTML = date[k].score;
            col3.innerHTML = data[k].result;
            col4.innerHTML = "BUTTON"; //BUTTON
        }
    }
    ////////////////////////////////////////////////////////////////////

    //                      Statistics and Ranking

    ////////////////////////////////////////////////////////////////////
    var stats;


    function getRank() {

    }

    function addStats() {
        console.log("posting to table");
        stats = {
            userName: document.getElementById("userName_s").value,
            totalGames: 0,
            totalWins: 0,
            totalLoss: 0,
            winPercentage: 0,
            winStreak: 0,
            rank: "F",
        }

        var post = new XMLHttpRequest();
        post.open("POST", "/statistics", true);
        post.setRequestHeader("Content-type", "application/json");
        post.send(JSON.stringify({
            userName: stats.userName,
            totalGames: stats.totalGames,
            totalWins: stats.totalWins,
            totalLoss: stats.totalLoss,
            winPercentage: stats.winPercentage,
            winStreak: stats.winStreak,
            rank: stats.rank,
        }));
    }


    function updateStats(data) {
        var wins = 0;
        var winStreak = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i].result = "win") {
                wins++;
            }
        }

        for (var i = data.length - 1; i > 0; i--) {
            if (data[i].result = "win") {
                winStreak++;
            } else {
                break;
            }
        }

        stats = {
            userName: data[i].userName,
            totalGames: data.length,
            totalWins: wins,
            totalLoss: data.length - wins,
            winPercentage: wins / data.length,
            winStreak: winStreak,
            rank: "F",
        }

        var post = new XMLHttpRequest();
        post.open("POST", "/statistics", true);
        post.setRequestHeader("Content-type", "application/json");
        post.send(JSON.stringify({
            userName: stats.userName,
            totalGames: stats.totalGames,
            totalWins: stats.totalWins,
            totalLoss: stats.totalLoss,
            winPercentage: stats.winPercentage,
            winStreak: stats.winStreak,
            rank: stats.rank,
        }));

    }

    function updateDisplayStats() {
        var user = document.getElementById("username_s").value;
        var post = new XMLHttpRequest();
        post.open("POST", "/statisticsRemove", true);
        post.setRequestHeader("Content-type", "application/json");
        post.send(JSON.stringify({
            userName: user,
        }));

        var x = new XMLHttpRequest();
        x.open("GET", "/statistics", true);
        x.send();
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                var stats = JSON.parse(x.responseText);

                document.getElementById("title-username").value = stats[0].userName;
                document.getElementById("stats-games-played").value = stats[0].totalGames;
                document.getElementById("stats-games-won").value = stats[0].totalWins;
                document.getElementByID("stats-win-percentage").value = stats[0].winPercentage;
                document.getElementById("stats-win-streak") = stats[0].winStreak;
                document.getElementById("stats-rank") = stats[0].rank;
            }
        }
    }



    window.onload = function () {



        document.getElementById("addMatch_button").onclick = function () {
            addMatchHistory();
            x = getMatchHistory()
            x.onreadystatechange = function () {
                if (x.readyState == 4 && x.status == 200) {
                    var data = JSON.parse(x.responseText);
                    updateMatchHistoryTable(data);
                }
            }
        }

        document.getElementById("updateMatchHistory").onclick = function () {
            var x = getMatchHistory();
            x.onreadystatechange = function () {
                if (x.readyState == 4 && x.status == 200) {
                    var data = JSON.parse(x.responseText);
                    updateMatchHistoryTable(data);
                }
            }
        }

        document.getElementById("addStats_button").onclick = function () {
            addStats();
        }

        document.getElementById("updateStats").onclick = function () {
            var x = getMatchHistory();
            x.onreadystatechange = function () {
                if (x.readyState == 4 && x.status == 200) {
                    var data = JSON.parse(x.responseText);
                    updateStats(data);
                }
            }
        }
    }
});

