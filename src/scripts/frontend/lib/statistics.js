define(['requestHandler','jquery'], function(RequestHandler,$) {
    //git push
    class Statistics {

        constructor(){
            this.stats = {}
            this.matchId = []
        }

        profileStats() {
            RequestHandler.getActiveUser()
            .then((function(user) {
                if(!user) throw "No user auth"
                this.matchId = JSON.parse(user).matches
            }).bind(this))
            .then((function() {
                this.displayMatchHistory()
                this.displayStats()
            }).bind(this))     
            .catch(function(err){
                console.log(err)
            })                
        }

        landingStats() {
            RequestHandler.getActiveUser()
            .then((function(user) {
                if(!user) throw "No user auth"
                this.matchId = JSON.parse(user).matches
            }).bind(this))
            .then((function() {
                this.displayStats()
            }).bind(this))           
            .catch(function(err){
                console.log(err)
            })      
        }

        displayMatchHistory() {
            for (var i = this.matchId.length - 1; i >= 0; i--) {
                RequestHandler.get('Match', this.matchId[i])
                    .then((function (data) {

                        var userColour, playerScore, opponentScore, result                            

                        userColour = data.userColour
                        if(userColour === "white"){
                            playerScore = data.whiteScore
                            opponentScore = data.blackScore
                        } else {
                            playerScore = data.blackScore
                            opponentScore = data.whiteScore
                        }

                        if(playerScore > opponentScore) {
                            result = "Win"
                        } else {
                            result = "Loss"
                        }

                        var mh = document.getElementById("match-history-body");
                        var row = mh.insertRow();
                        var col0 = row.insertCell(0);
                        var col1 = row.insertCell(1);
                        var col2 = row.insertCell(2);
                        var col3 = row.insertCell(3);
                        var col4 = row.insertCell(4);
                        var col5 = row.insertCell(5);


                        col0.innerHTML = this.makeDateTime(new Date(data.time));
                        col1.innerHTML = userColour
                        col2.innerHTML = playerScore;
                        col3.innerHTML = opponentScore;
                        col4.innerHTML = result;

                        $(col5).append(
                            $('<button type="button" class="btn btn-primary nav replay-button" id="register">Replay</button>')
                                .attr('data-match-id',data._id)
                                .on('click',function(e){
                                    var url = window.location.href = 'http://roberts.seng.uvic.ca:30103/game'
                                    window.location.href = url.concat(`?id=${$(e.currentTarget).attr('data-match-id')}`)
                                }.bind(this))
                        )


                    }).bind(this));

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


                        var userColour, playerScore, opponentScore, result                            

                        userColour = data.userColour
                        if(userColour === "white"){
                            playerScore = data.whiteScore
                            opponentScore = data.blackScore
                        } else {
                            playerScore = data.blackScore
                            opponentScore = data.whiteScore
                        }

                        if(playerScore > opponentScore) {
                            wins++
                        }

                        //winStreak
                        if (playerScore > opponentScore && winStreakLock == 0) {
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
                        $("#stats-win-percentage").text(Math.round(this.stats.winPercentage) + "%");
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

        makeDateTime(d) {
            return this.makeDateString(d) + " " + this.makeTimeString(d);
        }

        makeDateString(d) {
            var s = "";
            s += d.getFullYear() + "-";
            s += (((d.getMonth() + 1) > 9) ? (d.getMonth() + 1) : ("0" + (d.getMonth() + 1))) + "-";
            s += (((d.getDate()) > 9) ? ((d.getDate())) : ("0" + (d.getDate())));
            return s;
        }

        makeTimeString(d) {
            var s = "";
            s += ((d.getHours() > 9) ? (d.getHours()) : ("0" + d.getHours())) + ":";
            s += ((d.getMinutes() > 9) ? (d.getMinutes()) : ("0" + d.getMinutes())) + ":";
            s += ((d.getSeconds() > 9) ? (d.getSeconds()) : ("0" + d.getSeconds()));
            return s;
        }

    }

    var stats = new Statistics()
    return stats
})