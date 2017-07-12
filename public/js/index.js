require('./globals')
require('./video_carousel')
var Navigation = require("./navigation.js")

$(doApp)
showNutrition()
showMoreResearch()
setMobileMenuHeight();
manageResize();

function doApp() {
	var navigation = new Navigation({})
}

function manageResize(){
	var height = $(window).height();
	$(window).resize(function(){
		height = $(this).height();	
		setMobileMenuHeight();
	});
}
//Make the mobile nav li elements fill all the screen.
function setMobileMenuHeight(){
	if($(window).width()<=865){
		var nH = $(window).height()-$("#nav_elements").outerHeight()
		$("#menu-content").height((nH)+"px")
		$("#menu-content").find("li").height(((nH/7)-1)+"px")
	}else{
		$("#menu-content").height("inherit")
		$("#menu-content").find("li").height("inherit")
	}
}

function showNutrition(){

	//Display the nutrition info in the flavor section
	$(".show_info").on("click",function(e){
		if($(e.currentTarget).parent().find("p").text()=="Nutrition"){
			$(e.currentTarget).parent().find("p").text("Ingredients")
			$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").removeClass("hide") // hide and unhide nut. info
			$(e.currentTarget).parent().parent().parent().parent().find("h1").addClass("white_title") //change title color when info displayed
		}else{
			$(e.currentTarget).parent().find("p").text("Nutrition")
			$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").find("div").toggleClass("hide")
			if($(e.currentTarget).attr("src")==="/assets/img/plus_btn.svg"){
				$(e.currentTarget).attr("src","/assets/img/less_btn.svg")
				$(e.currentTarget).parent().find("p").text("Close")
			}else{
				$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").addClass("hide") // hide and unhide nut. info
				$(e.currentTarget).parent().parent().parent().parent().find("h1").removeClass("white_title")
				$(e.currentTarget).attr("src","/assets/img/plus_btn.svg")
			}
		}
	})

	//Display the nutrition info in the flavor section when click on label
	$(".nut_button p").on("click",function(e){
		if($(e.currentTarget).text()=="Nutrition"){
			$(e.currentTarget).text("Ingredients")
			$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").removeClass("hide") // hide and unhide nut. info
			$(e.currentTarget).parent().parent().parent().parent().find("h1").addClass("white_title") //change title color when info displayed
		}else{
			$(e.currentTarget).text("Nutrition")
			$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").find("div").toggleClass("hide")
			if($(e.currentTarget).parent().find(".show_info").attr("src")==="/assets/img/plus_btn.svg"){
				$(e.currentTarget).parent().find(".show_info").attr("src","/assets/img/less_btn.svg")
				$(e.currentTarget).text("Close")
			}else{
				$(e.currentTarget).parent().parent().parent().find(".nut_hide_info").addClass("hide") // hide and unhide nut. info
				$(e.currentTarget).parent().parent().parent().parent().find("h1").removeClass("white_title")
				$(e.currentTarget).parent().find(".show_info").attr("src","/assets/img/plus_btn.svg")
			}
		}
	})
}

$(".footer a").on("click",function(e){
	
        var temp_link = $(this).attr("href");
        if( temp_link.includes("mailto")==false &&temp_link!= undefined && temp_link!= "" && temp_link!= null ){
        	e.preventDefault()
        	var win = window.open(temp_link, '_blank');
        	if (win) {
       		//Browser has allowed it to be opened
            	win.focus();
        	} else {
        	//Browser has blocked it
            	alert('Please allow popups for this website');
        	}
        }else if($(this).text == "Help"){

        }
})

function showMoreResearch(){
	//Event for show extra info about a research
	/*$(".more_research").on("click",function(e){
		$(e.currentTarget).parent().find(".res_extraInfo").toggleClass("hide_research")
	})*/
	$(".res_link").on("click",function(e){
		e.preventDefault()
        var temp_link = $(this).attr("href");
        var win = window.open(temp_link, '_blank');
        if (win) {
        //Browser has allowed it to be opened
            win.focus();
        } else {
        //Browser has blocked it
            alert('Please allow popups for this website');
        }
	})
	//Event for display more researches
	$(".res_btn_more").on("click",function(e){
		$(e.currentTarget).parent().find(".extra").toggleClass("hide_research")
		
		//Change text of the button
		if($(e.currentTarget).find("p").text()==="View more"){
			$(e.currentTarget).find("p").text("View less")
		}else{
			$(e.currentTarget).find("p").text("View more")
		}
	})
}