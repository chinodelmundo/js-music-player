var init = function(){
		$(".play-button").on("click", function(e){
			$target = $(e.target);
			
			if($target.hasClass("fa-play")){
				if($(".fa-pause").length){
					togglePlay($(".fa-pause").parent());
				}
				changeSelected($target.parent());
			}else{
				$target.removeClass("fa-pause")
					   .addClass("fa-play");
				
				$(".fa-pause-circle-o").removeClass("fa-pause-circle-o")
					   .addClass("fa-play-circle-o");
			}
			
			togglePlay($target.parent());
		});
		

		$(".player-button").on("click", function(e){
			$target = $(e.target);
			
			if($target.hasClass("fa-pause-circle-o")){
				$target.removeClass("fa-pause-circle-o")
						.addClass("fa-play-circle-o");
						
				$songItem = $(".fa-pause").parent();
				$(".fa-pause").removeClass("fa-pause")
						.addClass("fa-play");
				
				togglePlay($songItem);
			}else if($target.hasClass("fa-play-circle-o")){
				var title = $target.parent().parent().find("b").text();
			
				console.log(title);
			
				$button = $(".song-item b:contains(" + title + ")").parent().parent().find("button");
				
				$target.removeClass("fa-play-circle-o")
						.addClass("fa-pause-circle-o");
				
				$button.removeClass("fa-play")
						.addClass("fa-pause");
				
				$songItem = $button.parent();
				togglePlay($songItem);
			}else if($target.hasClass("fa-step-backward")){
				$currentSongItem = $(".song-selected");
				
				if($currentSongItem.prev().length){
					$prevSongItem = $currentSongItem.prev();
				}else{
					$prevSongItem = $(".song-list").children().last();
				}
				
				changeSelected($prevSongItem);
				togglePlay($currentSongItem);
				togglePlay($prevSongItem);
			}else if($target.hasClass("fa-step-forward")){
				$currentSongItem = $(".song-selected");
				
				if($currentSongItem.next().length){
					$nextSongItem = $currentSongItem.next();
				}else{
					$nextSongItem = $(".song-list").children().first();
				}
				
				changeSelected($nextSongItem);
				togglePlay($currentSongItem);
				togglePlay($nextSongItem);
			}
		});
	}

var changeSelected = function($selectedSongItem){
	var title = $selectedSongItem.find("b").text();
	var artist = $selectedSongItem.find("i").text();
	
	$(".play-button").removeClass("fa-pause")
					 .addClass("fa-play");
	
	$button = $selectedSongItem.find("button");
	$button.removeClass("fa-play")
		   .addClass("fa-pause");
	
	$(".song-selected").removeClass("song-selected")
	$selectedSongItem.addClass("song-selected");
	
	$(".fa-play-circle-o").removeClass("fa-play-circle-o")
		   .addClass("fa-pause-circle-o");
	
	$("#playing-song-title").text(title);
	$("#playing-song-artist").text(artist);
}

var togglePlay = function($songItem){
	var song = $songItem.find("audio").first().get(0);
	
	if(song.paused){
		song.play();
	}else{
		song.pause();
	}
}

$(document).ready( function(){
	init();
});