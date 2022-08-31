var rankList = document.querySelector("#rank-list");
var newScores = (JSON.parse(localStorage.getItem("rankings")));


function postRankings() {
    rankList.innerHTML = "";

    for (var i = 0; i < newRanking.length; i++) {
        var newRankEntry = newRanking[i];

        var li = document.createElement("li");
        li.textContent = newRankEntry.initials + " - " + newRankEntry.score + "%";
        li.setAttribute("data-index", i);
        rankList.appendChild(li);
        console.log(newRankEntry);
    }
    console.log(newRanking);
}

postRankings();