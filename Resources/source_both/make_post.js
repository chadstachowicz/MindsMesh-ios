Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'absolute';

var btnPost = Titanium.UI.createButton({
	title:'Finish',
});
var selectedId = 0;
win.setRightNavButton(btnPost);
var movieModal = Ti.UI.createWindow({
        backgroundColor : '#00000000',
        barColor: '#46a546',
        title: 'Video',
        orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

});


if(win.movie != null)
{
	var activeMovie = Ti.Media.createVideoPlayer({
    backgroundColor: '#000',
    fullscreen: true,
    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
    media: win.movie,
    autoplay: false
});

    var thumbImage = activeMovie.thumbnailImageAtTime(0,Ti.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME);
    var movPict = Titanium.UI.createImageView({
				image: thumbImage,
				top: 60,
				left: 0,
				height: 'auto',
				width: 75,
			});
			var playButton = Titanium.UI.createImageView({
				image: '../images/LH2-Play-icon-2.png',
				top: 100,
				left: 15,
				height: 32,
				zIndex: 1,
				width: 32,
			});
			win.add(playButton);
			movPict.addEventListener('click', function(e){
				win.navGroup.open(movieModal,{animated:false});
				movieModal.add(activeMovie);
			activeMovie.addEventListener('fullscreen', function(e){
    			if (e.entering == 0) {
       				 win.navGroup.close(movieModal);
    			};
			});
			});
			playButton.addEventListener('click', function(e){
				win.navGroup.open(movieModal,{animated:false});
				movieModal.add(activeMovie);
			activeMovie.addEventListener('fullscreen', function(e){
    			if (e.entering == 0) {
       				 win.navGroup.close(movieModal);
    			};
			});
			});
			win.add(movPict);
}

if (Titanium.Platform.osname == 'iphone')
{
var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:0,
	left:80,
	height: 155,
	width: (Titanium.Platform.displayCaps.platformWidth - 55),
	backgroundColor:'#ecfaff',
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
//	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
//	returnKeyType:Titanium.UI.RETURNKEY_SENDRETURNKEY_EMERGENCY_CALL,
	suppressReturn:false
	
});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:50,
				width:50,
			});
} else {
	var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:0,
	left:80,
	height: 155,
	width: (Titanium.Platform.displayCaps.platformWidth - 75),
	backgroundColor:'#ecfaff',
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
//	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
//	returnKeyType:Titanium.UI.RETURNKEY_SENDRETURNKEY_EMERGENCY_CALL,
    font:{fontSize:16},
	suppressReturn:false
	
});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:75,
				width:75,
			});
}	
win.add(pict);	
win.add(ta1);
var pickerSelected = 0;
var timesfired = 0;
var data = [];
win.addEventListener('focus', function(e){
	ta1.focus();
});
btnPost.addEventListener('click', function(e){
		if(ta1.value.length >= 5)
		{				if(win.topic_id != null)
				{
					var postData = {'topic_id': win.topic_id, 'text': ta1.value};
				} else if (win.group_id != null) {		
					var postData = {'group_id': win.group_id, 'text': ta1.value};
				} else {					
					var postData = {'text': ta1.value};
				}
				
				xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
			xhr.onload = function(){
				var response = this.responseText;
				var test = JSON.parse(response);
				if (win.source == 'class_feed'){
					Titanium.App.fireEvent('event_three',{data:'posted'});
				} else {
					Titanium.App.fireEvent('event_one',{data:'posted'});
				}
				win.navGroup.closeWindow(win);

			};
			xhr.send(postData);
				
			
		} else {
			alert("A reasonable post should have at least 5 chars.");
		}
			
		
});




