var notesTotal = 0;
var notesPerClick = 1;

var coverOwned = 0;
var coverOn = false;
var coverCost = 10;
var coverEffect = 1;

var showNotes = function() {
    document.getElementById('notesTotal').innerHTML = 'Notes: ' + notesTotal;
}

var clickRecord = function() {
    notesTotal = notesTotal + notesPerClick;

    if (notesTotal >= coverCost || coverOn) {
        showCover();
        coverOn = true;
    };

    showNotes();
}

var showCover = function() {
    document.getElementById('coverName').innerHTML = '<a href="#" onClick="buyCover();">Cover Version</a>';
    document.getElementById('coverCost').innerHTML = coverCost;
    document.getElementById('coverOwned').innerHTML = coverOwned;
}

var buyCover = function() {
    if (notesTotal >= coverCost) {
        notesTotal = notesTotal - coverCost;
        notesPerClick = notesPerClick + coverEffect;
        coverEffect = coverEffect + (coverEffect*0,05);
        coverCost = coverCost + (coverCost*0,05);
        coverOwned++;

        showNotes();
        showCover();
	}
}