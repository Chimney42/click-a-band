(function($){
	$(document).on('ready', function() {
		var notesTotal = 0;
		var notesPerClick = 1;
		
		var songsOn = false;

		var coverOn = false;
		var coverOwned = 0;
		var coverEffect = 1;
		var coverCost = 10;

		var ownSongCost = 50;
		var ownSongOn = false;
		var ownSongEffect = 1;
		var ownSongOwned = 0;

		var showNotes = function() {
		    $('#notesTotal').html('Noten: ' + Math.round(notesTotal * 100) / 100);
		    $('#notesPerClick').html('Noten pro Klick: ' + Math.round(notesPerClick * 100) / 100);
		}

		var showStatsTitle = function() {
		    $('#statsUpgrade').html('Upgrade');
		    $('#statsEffect').html('Gesamteffekt');
		    $('#statsOwned').html('In Besitz');
		}

		var showSongs = function() {
		    $('#buySongsTitle').html('Songs');
		    $('#buySongsUpgrade').html('Upgrade');
		    $('#buySongsCost').html('Kosten');
			$('#buySongsEffect').html('Gesamteffekt');
		}

		var showStatsCover = function() {
		    showStatsTitle();
		    $('#coverName').html('Cover Version');
			$('#coverEffect').html('+' + Math.round(coverEffect * 100) / 100 + '/Klick');
		    $('#coverOwned').html(Math.round(coverOwned * 100) / 100);
		}

		var showBuyCover = function() {
		    $('#buyCoverName').html('<a href="#" id="buyCover">Cover Version</a>');
		    $('#coverCost').html(Math.round(coverCost * 100) / 100);
		    $('#buyCoverEffect').html('+' + Math.round(coverEffect * 100) / 100 + '/Klick');
		}

		var showBuyOwnSong = function() {
			$('#buyOwnSongName').html('<a href="#" id="buyOwnSong">Eigener Song</a>');
			$('#ownSongCost').html(Math.round(ownSongCost * 100) / 100);
		    $('#buyOwnSongEffect').html('+' + Math.round(ownSongEffect * 100) / 100 + '/s');
		}

		var clickRecord = function() {
		    notesTotal = notesTotal + notesPerClick;

		    if (notesTotal >= coverCost || songsOn) {
		        showSongs();
		    }

		    if (notesTotal >= coverCost || coverOn) {
		        showBuyCover();
		    }

		    if (notesTotal >= ownSongCost || ownSongOn) {
		    	showBuyOwnSong();
		    }

		    showNotes();
		}

		var buyCover = function() {
		    if (notesTotal >= coverCost) {
		        notesTotal = notesTotal - coverCost;
		        coverOwned++;
		        notesPerClick = notesPerClick + coverEffect;
		        coverCost = coverCost + (coverCost*0.05);
		        showNotes();
		        coverCost++;
		        coverOn = true;
		        showStatsCover();
		        coverEffect = coverEffect + coverEffect*0.05;
		        showBuyCover();
		    }
		}

		var buyOwnSong = function() {
		}

		$('#clickRecord').on('click', function (e) {
			e.preventDefault();
			clickRecord();
		});

		$('body').on('click', '#buyCover', function (e) {
			e.preventDefault();
			buyCover();
		});

		$('body').on('click', '#buyOwnSong', function (e) {
			e.preventDefault();
			buyCover();
		});
	});
})(jQuery);