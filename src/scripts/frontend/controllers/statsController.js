define(['lib/request', 'requestHandler'], function (request, requestHandler) {
    var match;

    //For get requests... Replace with your own
    var matchId =
        [
            "579143cd2ba6dfcaad8b4181",
            "579143cd2ba6dfcaad8b4182",
            "579143cd2ba6dfcaad8b4183",
        ];

    
    //Posting and Get Data... Remove Respective function

    //postMatchHistory();

    //getMatchHistory();

    displayMatchHistory();
    displayStats();

    ///////////////////////////////////////////////////////////
    //                        Requests
    ///////////////////////////////////////////////////////////

    function postMatchHistory() {
        console.log("postMatchHistory");
        
        //Dummy
        requestHandler.create('Match', {
            time: Date(),
            gameLength: "13:37",
            userId: "Me",
            opponent: "Foe",
            userHandicap: "Me",
            boardSize: 9,
            moveLog: [1, 3, 3, 7],
            whiteScore: 37,
            blackScore: 13,
            result: "win",
        })
        .then(function (res) {
            console.log(res)
            //requestHandler.create()

        });
        console.log(res);
    }

    function getMatchHistory(id) {
        console.log("getMatchHistory");

        requestHandler.get('Match', id)
        .then(function (res) {
            console.log(res)
        })
    }


    ///////////////////////////////////////////////////////////
    //                        Code
    ///////////////////////////////////////////////////////////


    function displayMatchHistory() {
        for (var i = matchId.length - 1; i >= 0; i--) {
            requestHandler.get('Match', matchId[i])
                .then(function (res) {
                    var data = JSON.parse(res);
                    
                    //Does not work
                    var replayButton = $('<input/>').attr({
                        //type: 'button',
                        id: 'replayMatch',
                        name: 'Replay',
                        number: data.time,
                        //class: "btn btn-default",
                        //width: "150",
                        //height: "150",
                        onclick: "replayClicked()"
                    })
                    .on("click", function () {
                        console.log("Oh Hi There");
                    })

                    var mh = document.getElementById("match-history-body");
                    var row = mh.insertRow();
                    var col0 = row.insertCell(0);
                    var col1 = row.insertCell(1);
                    var col2 = row.insertCell(2);
                    var col3 = row.insertCell(3);
                    var col4 = row.insertCell(4);
                    replayButton.clone().appendTo(col4);

                    col0.innerHTML = data.time;
                    col1.innerHTML = data.gameLength;
                    col2.innerHTML = data.whiteScore;
                    col3.innerHTML = data.result;
                });
        }
    }

    function replayClicked() {
        console.log("I WAS CLICKED");
    }

    //////////////////////////////////////////////////////////

    //             Statistics and Rankings

    //////////////////////////////////////////////////////////

    var stats;
    
    //Display new stats upon loading the page
    function displayStats() {
        var matchArray = [];
        var lock = 0;
        var wins = 0;

        var winStreakLock = 0;
        var winStreak = 0;

        var rank = "Failure";

        var i = -1;

        for (i = matchId.length - 1; i >= 0; i--) {
            requestHandler.get('Match', matchId[i])
                .then(function (res) {
                    var data = JSON.parse(res);

                    //wins
                    if (data.result == "win") {
                        wins++;
                    }

                    //winStreak
                    if (data.result == "win" && winStreakLock == 0) {
                        winStreak++;
                    } else {
                        winStreakLock = 1;
                    }

                    //Rank
                    if (winStreak <= 1) {
                        rank = "Failure";
                    } else if (winStreak >= 2 && winStreak <= 3) {
                        rank = "Rookie";
                    } else if (winStreak >= 4 && winStreak <= 5) {
                        rank = "Apprentice";
                    } else if (winStreak >= 6 && winStreak <= 7) {
                        rank = "Professional";
                    } else if (winStreak >= 8 && winStreak <= 10) {
                        rank = "Master";
                    } else if (winStreak >= 11) {
                        rank = "Legendary Master";
                    }

                    stats = {
                        //userName: matchArray[0].userId,
                        totalGames: matchId.length,
                        totalWins: wins,
                        totalLoss: matchId.length - wins,
                        winPercentage: wins / matchId.length * 100,
                        winStreak: winStreak,
                        rank: rank,
                    }

                    //$("#title-username").text = stats.userName;
                    $("#stats-games-played").text(stats.totalGames);
                    $("#stats-games-won").text(stats.totalWins);
                    $("#stats-win-percentage").text(stats.winPercentage + "%");
                    $("#stats-win-streak").text(stats.winStreak);
                    $("#stats-rank").text(stats.rank);
                })
        } 
    }
});