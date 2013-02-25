Ti.include("model/api.js");
var offset = 0;
var data = [];
var win = Titanium.UI.currentWindow;
var shareWhoModal = Ti.UI.createWindow({
        backgroundColor : '#B0000000',
         zIndex: 1
    });
var shareModal = Ti.UI.createWindow({
        backgroundColor : '#B0000000',
        visible: false,
       
    });
     shareModal.addEventListener('click', function(e){
			 if(e.source.box != true){
 				shareModal.hide();}
 			})
        	var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	box: true,
        	borderRadius : 15,
        	top: 50,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 
   		var messageButton = Ti.UI.createButton({
    		title: 'Message',
   			toggle:false,
    		height: 30,
    		width:200,
			top: 10
		});
		messageButton.addEventListener('click', function(e){
			var win1 = Titanium.UI.createWindow({  
				title: 'Message',
				navGroup: win.navGroup,
    			url:'make_post.js',
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546',
    			});
    			win.navGroup.open(win1,{animated:false});
		})
		
		var photoButton = Ti.UI.createButton({
    		title: 'Photo',
   			 toggle:false,
    		height: 30,
    		width:200,

			top: 10
		});
		photoButton.addEventListener('click', function(e){
Titanium.Media.showCamera({

  success:function(event)
  {
  	//var t1 = Ti.UI.create3DMatrix();
//	t1 = t1.rotate(180,0,1,0);
        var cameraView = Ti.UI.createImageView({
            width: 320,
            height: 480,
            top: 0,
            left: 0,
            image: event.media,
        });
     //   cameraView.transform = t1;
        var imageNew = cameraView.toImage(function(e){
            //Save Image
            var filename1 = Titanium.Filesystem.applicationDataDirectory + "/NAMEOFTHEPICTURE.png";
           f = Titanium.Filesystem.getFile(filename1);
            f.write(e.blob);
          Titanium.Media.saveToPhotoGallery(f);
      //     Titanium.Media.hideCamera();
            //alert('my media' + event.media.width);
        });
        var thumbCameraView = Ti.UI.createImageView({
            width: 150,
            height: 225,
            top: 0,
            left: 0,
            image: event.media,
			transform: t1
        });
      //  thumbCameraView.add(thumbOverImage);
      //  win.add(thumbCameraView);
        	if (shareWhoModal.visible == true)
				{
					shareWhoModal.show();	
				} else {
					shareWhoModal.open();
				}
				shareWhoModal.visible = true;
  },
  cancel:function()
  {
  },
  error:function(error)
  {
    var a = Titanium.UI.createAlertDialog({title:'Camera'});
    if (error.code == Titanium.Media.NO_CAMERA)
    {
      a.setMessage('Lancia questa applicazione dal telefono');
    }
    else
    {
      a.setMessage('Errore: ' + error.code);
    }
    a.show();
  },
 // overlay:overImage,
  showControls:true,
  mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
    saveToPhotoGallery:false,
    allowEditing: true,
    allowImageEditing:true,
});
		})
		
		var videoButton = Ti.UI.createButton({
    		title: 'Video',
   			 toggle:false,
    		height: 30,
    		width:200,

			top: 10
		});
		videoButton.addEventListener('click', function(e){
		var record = true
		if (record == false)
		{
			var activeMovie = Titanium.Media.createVideoPlayer({
				backgroundColor:'#111',
				mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
				//contentURL:movieFile.nativePath
				media:movieFile			// note you can use either contentURL to nativePath or the file object
			});
			activeMovie.play();

			activeMovie.addEventListener('complete', function()
			{
				movieFile.deleteFile();
				record = true;
			});

				win.add(activeMovie);
		}
		else
		{
			Titanium.Media.showCamera({

				success:function(event)
				{
     shareWhoModal.addEventListener('click', function(e){
			 if(e.source.box != true){
			 	
			 	
			 	var dlg = Titanium.UI.createAlertDialog({
			 	box: true,
    			message:'If you exit your content will be lost from this post, is that ok?', 
    			buttonNames: ['Yes','Cancel']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) { 
   				 	shareWhoModal.close();
   				 } else if (ev.index == 1) { // clicked "No"
					dlg.hide();
   				 }
 			 });
 			 dlg.show();
 				}
 			});
        	var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	box: true,
        	borderRadius : 15,
        	top: 50,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 var btnDone = Ti.UI.createButton({title:'Done'});
   		 var ta1 = Titanium.UI.createTextArea({
			editable: true,
	top:-81,
	left:82,
	box: true,
	height: 134,
	value: "Enter a Message!",
	width: (Titanium.Platform.displayCaps.platformWidth - 130),
	color:'#000',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
	suppressReturn:false,
	keyboardToolbar: [btnDone]
});
   		 btnDone.addEventListener('click', function(e){
   		 	ta1.blur();
   		 });
ta1._hintText = ta1.value;
 
ta1.addEventListener('focus',function(e){
    if(e.source.value == e.source._hintText){
        e.source.value = "";
    }
});
ta1.addEventListener('blur',function(e){
    if(e.source.value==""){
        e.source.value = e.source._hintText;
    }
});
   		var friendButton = Ti.UI.createButton({
    		title: 'Friend(s)',
   			toggle:false,
    		height: 30,
    		width:200,
    		box: true,
			top: 10
		});
		friendButton.addEventListener('click', function(e){
			var win1 = Titanium.UI.createWindow({  
				title: 'Message',
				navGroup: win.navGroup,
    			url:'make_post.js',
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546',
    			});
    			win.navGroup.open(win1,{animated:false});
		})
		
		var campusButton = Ti.UI.createButton({
    		title: 'Everyone',
   			 toggle:false,
    		height: 30,
    		width:200,
			box: true,
			top: 10
		});
		
		var classButton = Ti.UI.createButton({
    		title: 'Class',
   			 toggle:false,
    		height: 30,
    		width:200,
			box: true,
			top: 10
		});
		classButton.addEventListener('click', function(e){
			
			xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
			xhr.onload = function(){
				var response = this.responseText;
				var user = JSON.parse(response);
				for(c=0;c<user.topic_users.length;c++){
            		data[c]=Ti.UI.createPickerRow({title:user.topic_users[c].topic.name,topic_user_id:user.topic_users[c].id});
       			 }
       			// turn on the selection indicator (off by default)
			var picker = Ti.UI.createPicker({
				bottom: 0,
				width: Titanium.UI.FILL
			});
			var picker_view = Titanium.UI.createView({
				height:251,
				zIndex: 25,
				bottom:0
			});
 
			var cancel =  Titanium.UI.createButton({
				title:'Cancel',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
 
			var done =  Titanium.UI.createButton({
				title:'Finish',
				style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
 
			var spacer =  Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
 
			var toolbar =  Titanium.UI.createToolbar({
				top:0,
				height: 51,
				items:[cancel,spacer,done]
			});
			cancel.addEventListener('click',function() {
				picker_view.hide();
			});
			done.addEventListener('click', function(){
				var postData = {'post':{'topic_user_id': selectedId, 'text' :ta1.value}, 'file': event.media.toBlob()};
				xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
				xhr.onload = function(){
					var response = this.responseText;
					var test = JSON.parse(response);
					if (win.source == 'class_feed'){
						Titanium.App.fireEvent('event_three',{data:'posted'});
					} else {
						Titanium.App.fireEvent('event_one',{data:'posted'});
					}
					win.navGroup.close(win);

				};
				xhr.send(JSON.stringify(postData));
				picker_view.hide();
				shareWhoModal.close();
			});
			
			picker.SelectionIndicator = true;
			picker.add(data);
			picker_view.add(toolbar);
			picker_view.add(picker);
			shareWhoModal.add(picker_view);
			picker.show();
		}
		xhr.send();
});
	
		


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: -37,
    			left: 55,
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Add a message and share',
    			font:{fontSize:12},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: 55,
 
			});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 7,
				box: true,
				height:2,
			});
			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:40,
				width:40,
			});

			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);



				 var movieModal = Ti.UI.createWindow({
        backgroundColor : '#00000000',
        barColor: '#46a546',
        title: 'Video',
        orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

});
movieModal.addEventListener('close', function(e){
	shareWhoModal.show();
});
	var activeMovie = Ti.Media.createVideoPlayer({
    backgroundColor: '#000',
    fullscreen: true,
    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE,
    media: event.media,
    autoplay: false
});

    var thumbImage = activeMovie.thumbnailImageAtTime(0,Ti.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME);
    var movPict = Titanium.UI.createImageView({
				image: thumbImage,
				top: 5,
				left: 5,
				box: true,
				height: 'auto',
				width: 75,
			});
			var playButton = Titanium.UI.createImageView({
				image: '../images/LH2-Play-icon-2.png',
				top: -85,
				left: 25,
				height: 32,
				zIndex: 1,
				box: true,
				width: 32,
			});
			movPict.addEventListener('click', function(e){
				win.navGroup.open(movieModal,{animated:false});
				movieModal.add(activeMovie);
				shareWhoModal.hide();
			activeMovie.addEventListener('fullscreen', function(e){
    			if (e.entering == 0) {
       				 win.navGroup.close(movieModal);
    			};
			});
			});
			playButton.addEventListener('click', function(e){
				win.navGroup.open(movieModal,{animated:false});
				movieModal.add(activeMovie);
				shareWhoModal.hide();
			activeMovie.addEventListener('fullscreen', function(e){
    			if (e.entering == 0) {
    				win.navGroup.close(movieModal);
    			};
			}); 
			});
			view.add(movPict);
			view.add(playButton);


		view.add(ta1);
		 view.add(friendButton);
		 view.add(campusButton);
		 view.add(classButton);
   		 shareWhoModal.add(view);
   		 shareWhoModal.open();
   		 
				record = false;
				},
				cancel:function()
				{

				},
				error:function(error)
				{
					// create alert
					var a = Titanium.UI.createAlertDialog({title:'Video'});

					// set message
					if (error.code == Titanium.Media.NO_VIDEO)
					{
						a.setMessage('Device does not have video recording capabilities');
					}
					else
					{
						a.setMessage('Unexpected error: ' + error.code);
					}

					// show alert
					a.show();
				},
				mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
				videoMaximumDuration:10000,
				videoQuality:Titanium.Media.QUALITY_HIGH,
			});

		}
		})
		
		var voiceButton = Ti.UI.createButton({
    		title: 'Voice',
   			 toggle:false,
    		height: 30,
    		width:200,

			top: 10
		});
		


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: -37,
    			left: 55,
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Share something awesome',
    			font:{fontSize:12},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: 55,
 
			});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 7,
				box: true,
				height:2,
			});
			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:40,
				width:40,
			});
			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);
		 view.add(messageButton);
		 view.add(photoButton);
		 view.add(videoButton);
		 view.add(voiceButton);
   		 shareModal.add(view);





var winModal = Ti.UI.createWindow({
        backgroundColor : '#B0000000',
        visible: false
    });
        	var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	box: true,
        	borderRadius : 15,
        	top: 50,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 var modalTableView = Titanium.UI.createTableView({
			backgroundColor:'#e2e7ed',
			box: true
		});
		
		modalTableView.addEventListener('click', function(e){			
			xhr = postNotificationMarkAsRead(Titanium.App.Properties.getString("mmat"),e.source.notification_id);
			xhr.onload = function(){
			var response = this.responseText;

			if(e.source.type == "Post")
			{
				var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546',
    			notModal: winModal
			});
			win1.postid = e.source.id;
			win1.fullname = Titanium.App.Properties.getString("name");
			win1.photo_url = Titanium.App.Properties.getString("photo_url");
			winModal.hide();
			win.navGroup.open(win1,{animated:false});
			} else if (e.source.type == "Topic"){
				Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, class_id: e.source.id});
			}
	}
	xhr.send();
		
});


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: -37,
    			left: 55,
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Notifications',
    			font:{fontSize:12},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: 55,
 
			});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 7,
				box: true,
				height:2,
			});
			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:40,
				width:40,
			});
			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);
		 view.add(modalTableView);
   		 winModal.add(view);
var tableView = Titanium.UI.createTableView({
	backgroundColor:'#46a546',
	separatorStyle: 'none'
});
var scrollView = Ti.UI.createScrollView({
            contentHeight : 'auto',
            layout : 'vertical',
            showVerticalScrollIndicator: true
            });
//win.addEventListener('touchstart', function(e){
 //    Get starting horizontal position
 ///	alert("test2");
 //   e.source.axis = parseInt(e.x);
//});
//win.addEventListener('touchmove', function(e){
 //    Subtracting current position to starting horizontal position
   // var coordinates = parseInt(e.globalPoint.x) - e.source.axis;
   // alert("test3");
   // //Detecting movement after a 20px shift
  //  if(coordinates > 20 || coordinates < -20){
    //    e.source.moving = true;
  //  }
    // Locks the window so it doesn't move further than allowed
//    if(e.source.moving == true && coordinates <= 260 && coordinates >= 0){
        // This will smooth the animation and make it less jumpy
//		Titanium.App.fireEvent('touch-slide',{cords:coordinates});
//    }
//});
var menuButton = Ti.UI.createButton({
 	image:'../images/Paragraph-Justify.png',
    toggle:false // Custom property for menu toggle
});
win.setLeftNavButton(menuButton);

menuButton.addEventListener('click', function(e){
	if(menuButton.toggle == false)
	{
		tableView.scrollable = false;
	} else {
		tableView.scrollable = true;
	}
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});
Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
	
	menuButton.toggle = e.toggle;
});
Titanium.App.addEventListener('main-win-close', function(e)
{
	winModal.close();
	win.navGroup.close(win);
});


function reloadNotifications()
{
modalTableView.data = [];
xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	if(user.unread.length > 0){
		var notificationButton = Ti.UI.createButton({
    		backgroundImage:'../images/bell-light.png',
    		height:27,
    		width:27,
		});
		var label = Ti.UI.createLabel({
    		text: user.unread.length,
    		textAlign: "center",
    		height: 'auto',
    		width: 11,
    		font: {
        		fontWeight: "bold",
        		fontSize: 12
    		},
    		backgroundColor: "red",
    		color: "white",
    		borderRadius: 3,
    		top: 0,
    		left: 15
    	});
    	notificationButton.add(label);
	} else {
		var notificationButton = Ti.UI.createButton({
    		backgroundImage:'../images/bell.png',
    		height:25,
    		width:25,
		});
	}
	win.setTitleControl(notificationButton);
	win.title = "Feed";
		for (var i = 0; i < user.unread.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:user.unread[i].actors_count + ' people ' + user.unread[i].action + ' to',
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.unread[i].text,
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:11},
    			color:'#000',
    			height: 12,
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10
 
			});
			var flag = Titanium.UI.createImageView({
				image: '../images/flag_new_red.png',
				top: -27,
				right: 12,
				notification_id: user.unread[i].id,
				id:user.unread[i].target_id,
				type: user.unread[i].target_type,
				box:true,
				height:24,
				width:24,
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.unread[i].id,
                id:user.unread[i].target_id,
                type: user.unread[i].target_type,
                layout: 'vertical',
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
             fbRow.add(flag);
         modalTableView.appendRow(fbRow);
          }
          for (var i = 0; i < user.read.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:user.read[i].actors_count + ' people ' + user.read[i].action + ' to',
    			box:true,
    			notification_id: user.read[i].id,
    			id:user.read[i].target_id,
    			type: user.read[i].target_type,
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.read[i].text,
    			box:true,
    			notification_id: user.read[i].id,
    			id:user.read[i].target_id,
    			type: user.read[i].target_type,
    			font:{fontSize:11},
    			color:'#000',
    			height: 12,
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.read[i].id,
                id:user.read[i].target_id,
                type: user.read[i].target_type,
                layout: 'vertical',
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
         modalTableView.appendRow(fbRow);
          }
			 winModal.addEventListener('click', function(e){
			 	if(e.source.box != true){
 				winModal.hide();}
 			})
			notificationButton.addEventListener('click', function(e){
				if (winModal.visible == true)
				{
					winModal.show();	
				} else {
					winModal.open();
				}
				winModal.visible = true;
			});
			
			
//			
}
xhr.send()
}


//var fontawesome = IconicFont({ fontfamily: "FontAwesome", ligature: false });
//var fontawesomeLabel = Ti.UI.createLabel({ font: { fontFamily: fontawesome.fontfamily() }, text: fontawesome.icon('bell') });


        tableView.addEventListener('click', function(e)
		{
			if(menuButton.toggle == true){
				Titanium.App.fireEvent('nav-menu-button',{data:true});
				tableView.scrollable = true;
			} else {
				var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
    			navGroup: win.navGroup,
  				backgroundColor:'#fff',
  				barColor: '#46a546'
				});
				win1.postid = e.rowData.result;
				win1.fullname = e.rowData.fullname;
				win1.photo_url = e.rowData.photo_url;
				win.navGroup.open(win1,{animated:false});
			}
		
		});
win.add(tableView);
var brainlabel = [];

var btnPost = Titanium.UI.createButton({
	title:'Share',
});
if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad'){
win.setRightNavButton(btnPost);
}

btnPost.addEventListener('click', function(e){
				if (shareModal.visible == true)
				{
					shareModal.show();	
				} else {
					shareModal.open();
				}
				shareModal.visible = true;
});
var lastRow = 0;

var border = Ti.UI.createView({
	backgroundColor:"#576c89",
	height:2,
	bottom:0
});

var tableHeader = Ti.UI.createView({
	backgroundColor:"#e2e7ed",
	width:320,
	height:60
});

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
	backgroundImage:"../images/whiteArrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});
 
var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
 
var lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
var actInd = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});
var statusLabel2 = Ti.UI.createLabel({
	text:"Loading...",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
var actInd2 = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

tableView.headerPullView = tableHeader;

var reloading = false;
var updating = false;
var loadingRow = Ti.UI.createTableViewRow({backgroundColor:'#e2e7ed'});
loadingRow.add(statusLabel2);
loadingRow.add(actInd2);
var lastRowId = 1;
var row = '';
var pulling = false;
endReloading();
function formatDate()
{
	var d = new Date;
	var datestr = d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear();
	if (d.getHours()>=12)
	{
           datestr+=' '+(d.getHours()==12 ? 
              d.getHours() : d.getHours()-12)+':'+
              d.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+d.getHours()+':'+d.getMinutes()+' AM';
	}
	return datestr;
}
function beginReloading()
{
	// just mock out the reload
	setTimeout(endReloading,2000);
}

function endReloading()
{
	var rd = []; tableView.data = rd;
	lastRow = 0;
	lastRowId = 1;
    xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
    xhr.onload = function(){
    	onLoad(this.responseText);
    };
	xhr.send();

	// when you're done, just reset
	if(Titanium.Platform.name == 'iPhone OS'){
		
	tableView.setContentInsets({top:0},{animated:true});
	
	}
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	lastDistance = 0;
	actInd.hide();
	arrow.show();
}

win.addEventListener('focus', function() 
{
  if ( Titanium.Network.online) {
  	if (win.passedData == 'posted'){
  		reloading = true;
  		tableView.setData([]);
    	beginReloading();
   } else {
   	 reloadNotifications();
   }
   win.passedData = null;
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});

var lastDistance = 0;
tableView.addEventListener('scroll',function(e)
{
	var offset = e.contentOffset.y;
	var height = e.size.height;
	var total = offset + height;
	var theEnd = e.contentSize.height;
	var distance = theEnd - total;

	// going down is the only time we dynamically load,
	// going up we can safely ignore -- note here that
	// the values will be negative so we do the opposite
	if (!pulling && !updating && !reloading && (distance < lastDistance) && (row.length>=10))
	{
		// adjust the % of rows scrolled before we decide to start fetching
		var nearEnd = theEnd * .75;

		if (!pulling && !updating && !reloading && (total >= nearEnd))
		{
			beginUpdate();
		}
	}
	else if (offset < -65.0 && !pulling && !reloading && !updating)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Release to refresh...";
	}
	else if((offset > -65.0 && offset < 0 ) && pulling && !reloading && !updating)
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Pull down to refresh...";
	}    
});

tableView.addEventListener('dragEnd', function()
{	
	if(pulling && !reloading && !updating)
	{
		reloading = true;
		pulling = false;
		arrow.hide();
		actInd.show();
		statusLabel.text = "Reloading...";
		tableView.setContentInsets({top:60},{animated:true});
		tableView.scrollToTop(-60,true);
		arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
		reloadNotifications();
	}
});
function beginUpdate()
{
	updating = true;
	tableView.appendRow(loadingRow);
	actInd2.show();
	
	// just mock out the reload
	setTimeout(endUpdate,2000);
}

function endUpdate()
{
	actInd2.hide();
	tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'),lastRowId);
	xhr.onload = function(){
    	onLoad(this.responseText);
    };
	xhr.send();
//	 just scroll down a bit to the new rows to bring them into view
//	tableView.scrollToIndex(lastRow-1,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});

}
function likeButton(postid, labelid)
{
	var apiUrl2 = 'https://mindsmesh.com/api/v1/posts/' + postid + '/like?access_token=' + Titanium.App.Properties.getString('mmat');
	var likeres;
	xhr.open('POST', apiUrl2);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onerror = function(e){
		alert('HTTP ERR'+e.error);
	}
	xhr.onload = function(){
		var response = this.responseText;
		likeres = JSON.parse(response);
		brainlabel[labelid].text = likeres.likes_count;
	}
	xhr.send();

}
function timeDifference(current, previous) {
	var prev = new Date(previous);
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - prev;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'about ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'about ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'about ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
Titanium.App.addEventListener('event_one', function(e)
{
    win.passedData = e.data;
});
var commentHolder = [];
var backHolder = [];
var seperatorPhone  = [];
var comment  = [];
var g = 0;
function onLoad(response){
	var d = new Date();
	row = JSON.parse(response);
	if(reloading == true){
		g = 0;
	}
	if (lastRow == 0){
	lastRow = (row.length);} else  {lastRow += row.length;}
       for(c=0;c<row.length;c++){
       		var post = row[c];
       		if (c == (row.length - 1))
       		{
       			lastRowId = post.id
       		}
            var fullname = post.user.name;
          	var picUrl = post.user.photo_url;
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#46a546',
                height:Ti.UI.SIZE,
                result: post.id,
                fullname: fullname,
                photo_url: picUrl,
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                layout:'vertical'

            });
if (Titanium.Platform.osname == "iphone"){
	
	
            var fbName = Titanium.UI.createLabel({
                text: fullname + " asked " + post.topic.number,
                backgroundColor:'#ecfaff',
				textAlign:'left',
				left:55,
				height:'auto',
				top: -41,
				color:'#46a546',
				font:{fontWeight:'bold',fontSize:13}
			});
			var timetext = timeDifference(d,post.created_at);
			var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#ecfaff',
				textAlign:'left',
		left:55,
		top: 5,
		height:'auto',
		color:'#808080',
		font:{fontSize:11}
		});
	comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		width: Titanium.Platform.displayCaps.platformWidth - 30,
		top:15,
		height:Ti.UI.SIZE,
		font:{fontSize:12}
            });
	commentHolder[g] = Ti.UI.createView({
		backgroundColor: '#ecfaff',
		top: 6,
		width:Titanium.Platform.displayCaps.platformWidth - 10,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
           var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 10,
           right: 0,
		textAlign:'center',
		font:{fontWeight:'bold',fontSize:11}
            });
            
             var tmpView = Ti.UI.createView({
 			width: 30,
			height: 30,
			right: 5
 				
 			})
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width: 16,
			height: 16,
			left: 0,
			backgroundImage: '../images/comment.png',
			})
			tmpView.add(givbutton);
            tmpView.add(commentCount);
			
			
			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 10,
				left: 10,
				height:40,
				width:40,
			});

			} else {
				var fbName = Titanium.UI.createLabel({
                text: fullname + " asked " + post.topic.number,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:80,
		height:'auto',
		top: -55,
		color:'#46a546',
		font:{fontWeight:'bold',fontSize:20}
		});
		var timetext = timeDifference(d,post.created_at);
		var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:80,
		height:'auto',
		top: 10,
		color:'#808080',
		font:{fontSize:14}
		});
		    var w = Titanium.Platform.displayCaps.platformWidth;
    var h = Titanium.Platform.displayCaps.platformHeight;
    var comWidth = 0;
    if( w > h){
        comWidth = Titanium.Platform.displayCaps.platformHeight;
    }else{
        comWidth = Titanium.Platform.displayCaps.platformWidth;
    }

		comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:15,
		top:5,
		width:comWidth - 60,
		height:Ti.UI.SIZE,
		font:{fontSize:16}
            });

        commentHolder[g] = Ti.UI.createView({
		backgroundColor: '#ecfaff',
		top: 15,
		width:comWidth - 30,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
	
	
	
	var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 13,
           right: 0,
		textAlign:'center',
		font:{fontWeight:'bold',fontSize:16}
            });
            
             var tmpView = Ti.UI.createView({
 			width: 52,
			height: 42,
			right: 5
 				
 			})
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width:32,
			height: 32,
			left: 0,
			backgroundImage: '../images/comment_32.png',
			})
			tmpView.add(givbutton);
            tmpView.add(commentCount);
			
			
			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 15,
				left: 15,
				height:50,
				width:50,
			});

			}
			commentHolder[g].add(pict);
            commentHolder[g].add(fbName);
            commentHolder[g].add(postTime);
            commentHolder[g].add(comment[g]);
            var commentSpacer = Ti.UI.createView({
				backgroundColor: '#ecfaff',
				width:comWidth - 30,
				height:20,
			});
			commentHolder[g].add(commentSpacer);
            if (Titanium.Platform.osname == "iphone"){
            backHolder[g] = Ti.UI.createView({
				borderRadius: 2,
				backgroundColor:"#e2e7ed",
				width:Titanium.Platform.displayCaps.platformWidth - 10,
				height:'auto',
				zIndex: -1,
				height: 30,
				bottom: 6,
			});
			if (post.post_attachments.length > 0)
			{

					var attach = Titanium.UI.createLabel({
            		text: (post.post_attachments.length + ' file(s) attached'),
					height: 'auto',
					textAlign: 'center',
					left: 27,
					top: 7,
					font:{fontSize:11, color: '#fff'}
					});
					var paperclip = Titanium.UI.createImageView({
					image: '../images/paperclip_black_24.png',
					left: 10,
					top: 6,
					height:16,
					width:16,
				});
				backHolder[g].add(paperclip);
            	backHolder[g].add(attach);
			}
			seperatorPhone[g] = Ti.UI.createView({
				backgroundColor: "#808080",
				width:Titanium.Platform.displayCaps.platformWidth - 10,
				height:1,
			});
			} else {
			backHolder[g] = Ti.UI.createView({
				backgroundColor:"#e2e7ed",
				width:comWidth - 30,
				height:'auto',
				zIndex: -1,
				height: 42,
				bottom: 6,
			});
			if (post.post_attachments.length > 0)
			{

					var attach = Titanium.UI.createLabel({
            		text: (post.post_attachments.length + ' file(s) attached'),
					height: 'auto',
					textAlign: 'center',
					left: 50,
					top: 10,
					font:{fontSize:14, color: '#fff'}
					});
					var paperclip = Titanium.UI.createImageView({
					image: '../images/paperclip4_black.png',
					left: 15,
					top: 6,
					height:32,
					width:32,
				});
				backHolder[g].add(paperclip);
            	backHolder[g].add(attach);
			}
			seperatorPhone[g] = Ti.UI.createView({
				backgroundColor: "#808080",
				width:comWidth - 30,
				height:1,
			});
			}
            
			fbRow.add(commentHolder[g]);
            fbRow.add(seperatorPhone[g]);
            backHolder[g].add(tmpView);
            fbRow.add(backHolder[g]);
            tableView.appendRow(fbRow);
            g++;


           
        }
        if (updating){
        	tableView.scrollToIndex(lastRow-(row.length - 1),{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
        }
        updating = false;
        reloading = false;
   };
   Ti.Gesture.addEventListener('orientationchange',function(e){
        win.width = Titanium.Platform.displayCaps.platformWidth;
 //       if (Titanium.Platform.osname == "iphone"){
 //       for(c=0;c<g;c++){
 //       	commentHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
 //       	backHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
 //       	seperatorPhone[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
  //      	comment[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
 ///       }
  //      } else {
  //      	for(c=0;c<g;c++){
  //      	commentHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
  //      	backHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
   //     	seperatorPhone[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
 //       	comment[c].width = Titanium.Platform.displayCaps.platformWidth - 60;
 //       }
 //       }
   });
