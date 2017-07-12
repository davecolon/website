// Show the video container and auto play the video. Also hide the nav arrows of the carousel
$(".video_play_btn").click(function(e) {
	$(e.currentTarget).parent().find(".video_content").toggleClass("hide")
	$(e.currentTarget).parent().find("video")[0].play()
	$(".arrows").addClass("hide")
})

//Close the video content and pause the video when click out of the video element
$('.video_content').click(function(e) {
	$(e.currentTarget).toggleClass("hide")
	$(e.currentTarget).find("video")[0].pause()
	$(".arrows").removeClass("hide")
})

//prevent close the video when clicking on the video element
$(".video_content video").click(function(e) {
	e.stopPropagation()
})

//Close and pause the video when clicking on the "X", also shows again the arrow for change video
$('.close_video').click(function(e) {
	$(e.currentTarget).parent().toggleClass("hide")
	$(e.currentTarget).parent().find("video")[0].pause()
	$(".arrows").removeClass("hide")
	e.stopPropagation()
})

//update the index of the lateral scrolling when using the dots for selecting video
$(".dots ul li img").click(function(e) {
	$(".dots ul li img").removeClass("active")
	$(e.currentTarget).addClass("active")
	var dot_id = $(e.currentTarget).attr("id")
	var dot_index = dot_id.substr(dot_id.length - 1)
	moveWithDots(dot_index)
})

//initialice the number of videos and the initial and final index
var $item = $('div.video_container'),
	index = 1, //Starting index
	endIndex = ( $item.find('.kvideo').length)

//Change to the next video using the right arrow on the carousel (the video on the right) PD: not the keyboard arrow.
$('.arrows .right').click(function(){
	if(index < endIndex ){
		index++
		changeActive(index)
		$item.animate({'left':'-=100%'})
	}
});

//Change to the preview video using the left arrow on the carousel (the video on the Left) PD: not the keyboard arrow
$('.arrows .left').click(function(){	
	if(index > 1 ){
		index--
		changeActive(index)
		$item.animate({'left':'+=100%'})
	}
});

//Add the class active to the video that is selected (the image of the video that is show on the carousel)
function changeActive(i){
	$(".dots ul li img").removeClass("active")
	$("#video_"+(i)).addClass("active")
}

//Horizontal movement on the carousel, depending on the video that is selected (first, second, third, ect.)
function moveWithDots(nIndex){
	if(index===0){
		index=1
	}
	var dest= nIndex-index 
	index = nIndex
	$item.animate({'left':'-='+(dest*100)+'%'})
}