require('./globals')

var Navigation = function(options) {
	
    function init() {
		$("nav li").on("click", handleNavClick);
		
        //prevent scroll while menu is open on mobile devices
        $("#menu-content").on("touchmove", function(e){
			 e.preventDefault()
		})

        //hide and unhide the menu elements on mobile devices
		$("#nav_elements .hamMenu, #menu-content li").on("click",function(){
            if($(window).width()<866){
                $("#menu-content").toggleClass( "nav_hide" )
            }
		})
	}

    //Handler the clicks over the menu items and show the selected.
	function handleNavClick(e) {
		$("nav li").removeClass("selected")
		$(e.currentTarget).addClass("selected")
	}

	init();
}

$('#main-logo').click(function(){
    if($("#menu-content").hasClass("nav_hide")){
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    }
})

//Smooth scrolling
$('nav li').click(function(e) {
    
    var target= $(this).find("a").attr("href")
    if(!target.includes("http")){
        window.history.pushState("", "", '/'+target)
    }
    else{
        return;
    }

    target= $(target)
    if (target.length) {
    	if($(window).width()<880){
           $('html,body').animate({
                scrollTop: target.offset().top - $('#nav_elements:not(.hide)').outerHeight()
        	}, 800);
     	}else{
     		if(target.attr('id').indexOf("flavor") !== -1 || target.attr('id').indexOf("research") !== -1 || target.attr('id').indexOf("theProduct") !== -1  || target.attr('id').indexOf("videos") !== -1 || target.attr('id').indexOf("intro") !== -1){
                $('html,body').animate({
                    scrollTop: target.offset().top - $('nav:not(.hide)').outerHeight()
        		}, 800);
     		}else{
     			$('html,body').animate({
                    scrollTop: target.offset().top
        		}, 800);
     		}
     	}
        return false;
    }
});

module.exports = Navigation;

