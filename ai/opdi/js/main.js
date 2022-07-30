const auth = firebase.auth();
var rand = Math.floor((Math.random() * 99999999999) + 1);
//----------------user if loggined---------------------//
auth.onAuthStateChanged(function(user){
		
    if(user){
    console.log('User LoggedIn')
       	uid = user.uid;
       	localStorage.setItem("uid",uid); 
	$('.user-info img').show();
	$('.user-info img').attr('src', user.photoUrl);
	$('.user-info .user-name').hide();
	uid = user.uid;
        $('.user-info img').hide();
	$('.user-info').append('<span class="user-name">' + user.username + '</span>');
	$('.user-info img').hide();
	$('.user-info').append('<span class="user-name">' + user.username + '</span>');
      
    }else{
        console.log("No Active User");
        //no user is signed in
        window.location.replace("login");
    }
});
function get($){
return document.querySelector($);
}
window.addEventListener('load',function(){
    if(window.innerWidth < 768){
        document.getElementById("left").classList.remove("col-2");
        document.getElementById("left").classList.remove("p-4");
        document.getElementById("left").style.width = '0px'
    }
})

