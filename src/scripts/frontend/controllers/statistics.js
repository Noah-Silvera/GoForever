define(['controllers/controller', 'views/UserView', 'models/UserModel', 'lib/request'], function (Controller, UserView, UserModel, request) {

   displayStats();

    function displayStats() {
        $("#title-username").text("Hi There");
        $("#stats-games-played").text("1337");
        $("#stats-games-won").text("1337");
        $("#stats-win-percentage").text("13.37%");
        $("#stats-win-streak").text("1337");
        $("#stats-rank").text("F");
        console.log($("#title-username").text());

        var user = document.getElementById("username_s").value;

        var x = new XMLHttpRequest();
        x.open("GET", "/getStats", true);
        x.setRequestHeader("Content-type", "application/json");
        x.send(JSON.stringify({userName: user}));
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                var stats = JSON.parse(x.responseText);

                document.getElementById("title-username").value = stats[0].userName;
                $("#stats-games-played").text(stats[0].totalGames);
                $("#stats-games-won").text(stats[0].totalWins);
                $("#stats-win-percentage").text(stats[0].winPercentage);
                $("#stats-win-streak").text(stats[0].winStreak);
                $("#stats-rank").text(stats[0].rank);
            }
        }

        /*
        var user = document.getElementById("username_s").value;
        var post = new XMLHttpRequest();
        post.open("POST", "/statisticsRemove", true);
        post.setRequestHeader("Content-type", "application/json");
        post.send(JSON.stringify({
            userName: user,
        }));

        var x = new XMLHttpRequest();
        x.open("GET", "/getStats", true);
        x.send(JSON.stringify({userName: user}));
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
        }*/
    }



    ////////////////////////////////////////////////////////////////////

    //                      Statistics and Ranking

    ////////////////////////////////////////////////////////////////////
    var stats;

    function addStats() {
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

