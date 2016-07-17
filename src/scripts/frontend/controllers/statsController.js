define(['controllers/controller', 'views/UserView', 'models/UserModel', 'lib/request'], function (Controller, UserView, UserModel, request) {
    var match;
    var user = "user"; //specific user id that will be used to access user data

    function getMatchHistory() {
        var x = new XMLHttpRequest();
        x.open("GET", "/matchHistory", true);
        x.send(JSON.stringify({ userName: user }));
        return x;
    }

    function displayMatchHistory(data) {
        var replayButton = $('<input/>').attr({
            type: 'button',
            id: 'replayMatch',
            value: 'Replay',
            className: "selectedReplay"
        });

        if (data == null) {
            return;
        }

        for (var k = 0; k < data.length; k++) {
            var mh = document.getElementById("match-history-body");
            var row = mh.insertRow();
            var col0 = row.insertCell(0);
            var col1 = row.insertCell(1);
            var col2 = row.insertCell(2);
            var col3 = row.insertCell(3);
            var col4 = row.insertCell(4);
            replayButton.clone().appendTo(col4);

            col0.innerHTML = data[k].startDate;
            col1.innerHTML = data[k].gameLength;
            col2.innerHTML = date[k].score;
            col3.innerHTML = data[k].result;
        }
    }

    //Load match history upon loading the page.
    function loadMatchHistory() {
        var x = getMatchHistory();
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                var data = JSON.parse(x.responseText);
                displayMatchHistory(data);
            }
        }
    }


    //////////////////////////////////////////////////////////

    //             Statistics and Rankings

    //////////////////////////////////////////////////////////

    var stats;
    
    //Display new stats upon loading the page
    function displayStats(data) {
        var wins = 0;
        var winStreak = 0;
        var rank = "I";

        //Total wins
        for (var i = 0; i < data.length; i++) {
            if (data[i].result = "win") {
                wins++;
            }
        }

        //Win streak
        for (var i = data.length - 1; i > 0; i--) {
            if (data[i].result = "win") {
                winStreak++;
            } else {
                break;
            }
        }

        if(winStreak <= 1){
            rank = "Failure";
        } else if (winStreak >= 2 && winStreak <= 3){
            rank = "Rookie";
        } else if (winStreak >= 4 && winStreak <= 5){
            rank = "Apprentice";
        } else if (winStreak >= 6 && winStreak <= 7){
            rank = "Professional";
        } else if (winStreak >= 8 && winStreak <= 10){
            rank = "Master";
        } else if (winStreak >= 11){
            rank = "Legendary Master";
        }

        stats = {
            userName: data[i].userName,
            totalGames: data.length,
            totalWins: wins,
            totalLoss: data.length - wins,
            winPercentage: wins / data.length,
            winStreak: winStreak,
            rank: rank,
        }

        document.getElementById("title-username").value = stats[0].userName;
        $("#stats-games-played").text(stats[0].totalGames);
        $("#stats-games-won").text(stats[0].totalWins);
        $("#stats-win-percentage").text(stats[0].winPercentage);
        $("#stats-win-streak").text(stats[0].winStreak);
        $("#stats-rank").text(stats[0].rank);
    }

    function loadStats(){
        var x = getMatchHistory();
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                var data = JSON.parse(x.responseText);
                displayStats(data);
            }
        }
    }

    function updateRank(){

    }

    function getMatchHistory(user) {
        var x = new XMLHttpRequest();
        x.open("GET", "/matchHistory", true);
        x.send(JSON.stringify({ userName: user }));
        return x;
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
});


