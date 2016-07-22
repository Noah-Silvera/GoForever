define(['RequestHandler'], function(RequestHandler) {

    class Statistics {

        constructor(){
            this.stats = {}
            this.matchId = []
        }

        profileStats() {
            RequestHandler.getActiveUser()
            .then((function(user) {
                this.matchId = JSON.parse(user).matches
            }).bind(this))
            .then((function() {
                this.displayMatchHistory()
                this.displayStats()
            }).bind(this))               
        }

        landingStats() {
            RequestHandler.getActiveUser()
            .then((function(user) {
                this.matchId = JSON.parse(user).matches
            }).bind(this))
            .then((function() {
                this.displayStats()
            }).bind(this))                 
        }

        displayMatchHistory() {
            for (var i = this.matchId.length - 1; i >= 0; i--) {
                RequestHandler.get('Match', this.matchId[i])
                    .then(function (data) {
                        

                        var mh = document.getElementById("match-history-body");
                        var row = mh.insertRow();
                        var col0 = row.insertCell(0);
                        var col1 = row.insertCell(1);
                        var col2 = row.insertCell(2);
                        var col3 = row.insertCell(3);
                        var col4 = row.insertCell(4);

                        col0.innerHTML = data.time;
                        col1.innerHTML = data.gameLength;
                        col2.innerHTML = data.whiteScore;
                        col3.innerHTML = data.result;
                    });
            }
        }

        displayStats() {
            var matchArray = [];
            var lock = 0;
            var wins = 0;

            var winStreakLock = 0;
            var winStreak = 0;

            var rank = "Failure";

            var i = -1;

            for (i = this.matchId.length - 1; i >= 0; i--) {
                RequestHandler.get('Match', this.matchId[i])
                    .then((function (data) {


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

                        this.stats = {
                            //userName: matchArray[0].userId,
                            totalGames: this.matchId.length,
                            totalWins: wins,
                            totalLoss: this.matchId.length - wins,
                            winPercentage: wins / this.matchId.length * 100,
                            winStreak: winStreak,
                            rank: rank,
                        }

                        //$("#title-username").text = stats.userName;
                        $("#stats-games-played").text(this.stats.totalGames);
                        $("#stats-games-won").text(this.stats.totalWins);
                        $("#stats-win-percentage").text(this.stats.winPercentage + "%");
                        $("#stats-win-streak").text(this.stats.winStreak);
                        $("#stats-rank").text(this.stats.rank);
                    }).bind(this))
            }

            if(this.matchId.length === 0){
                $("#stats-games-played").text(0);
                $("#stats-games-won").text(0);
                $("#stats-win-percentage").text("0%");
                $("#stats-win-streak").text(0);
                $("#stats-rank").text("Failure");
            } 
        }

    }

    var stats = new Statistics()
    return stats
})