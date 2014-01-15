var notesTotal = 0;
var notesPerClick = 1;
var songsOn = false;

var coverOn = false;
var coverOwned = 0;
var coverEffect = 1;
var coverCost = 10;

var showNotes = function() {
    document.getElementById('notesTotal').innerHTML = 'Noten: ' + Math.round(notesTotal * 100) / 100;
    document.getElementById('notesPerClick').innerHTML = 'Noten pro Klick: ' + Math.round(notesPerClick * 100) / 100;
}

var showStatsTitle = function() {
    document.getElementById('statsUpgrade').innerHTML = 'Upgrade';
    document.getElementById('statsEffect').innerHTML = 'Gesamteffekt';
    document.getElementById('statsOwned').innerHTML = 'In Besitz';
}

var showSongs = function() {
    document.getElementById('buySongsTitle').innerHTML = 'Songs';
    document.getElementById('buySongsUpgrade').innerHTML = 'Upgrade';
    document.getElementById('buySongsCost').innerHTML = 'Kosten';
    document.getElementById('buySongsEffect').innerHTML = 'Gesamteffekt';
}

var showStatsCover = function() {
    showStatsTitle();
    document.getElementById('coverName').innerHTML = 'Cover';
    document.getElementById('coverEffect').innerHTML = '+' + Math.round(coverEffect * 100) / 100 + '/Klick';
    document.getElementById('coverOwned').innerHTML = Math.round(coverOwned * 100) / 100;
}

var showBuyCover = function() {
    document.getElementById('coverBuyName').innerHTML = '<a href="#" onClick="buyCover();">Cover Version</a>';
    document.getElementById('coverCost').innerHTML = Math.round(coverCost * 100) / 100;
    document.getElementById('coverBuyEffect').innerHTML = '+' + Math.round(coverEffect * 100) / 100 + '/Klick';
}

var clickRecord = function() {
    notesTotal = notesTotal + notesPerClick;

    if (notesTotal >= coverCost || songsOn) {
        showSongs();
    }

    if (notesTotal >= coverCost || coverOn) {
        showBuyCover();
    };

    showNotes();
}


var buyCover = function() {
    if (notesTotal >= coverCost) {
        notesTotal = notesTotal - coverCost;
        notesPerClick = notesPerClick + coverEffect;
        coverCost = coverCost + (coverCost*0.05);
        coverOwned++;

        showNotes();
        coverCost++;
        coverOn = true;
        showStatsCover();
        coverEffect = coverEffect + coverEffect*0.05;
        showBuyCover();
    }
}
