Ti.include("model/api.js");

var win = Titanium.UI.currentWindow;
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
    			navGroup: win.navGroup,
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546',
    			notModal: winModal
			});
			win1.postid = e.source.id;
			win1.fullname = Titanium.App.Properties.getString("name");
			win1.photo_url = Titanium.App.Properties.getString("photo_url");
			winModal.hide();
			win.navGroup.openWindow(win1,{animated:false});
			} else if (e.source.type == "Topic"){
				Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, class_id: e.source.id});
			}
	};
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
var grades_button =  Titanium.UI.createButton({
		title:'Grades',
});
var regex = /course\/view\.php\?id=(\d+)/;
gradesid = regex.exec(win.Moodurl);

if(Titanium.Platform.name == 'iPhone OS'){
	
//win.setRightNavButton(grades_button);

}
grades_button.addEventListener('click', function(e){
	var win1 = Titanium.UI.createWindow({  
    					title:"Grades",
   	 					backgroundColor:'#ecfaff',
   	 					layout:'absolute',
   	 					barColor: '#46a546'
						});

					url2 = 'https://moodle.uncc.edu/grade/report/index.php?id=' + gradesid[1];
					var webview = Titanium.UI.createWebView({url:url2});
					win1.add(webview);
					win.navGroup.openWindow(win1,{animated:false});

});
var tableview = Titanium.UI.createTableView({
	backgroundColor:'#ecfaff',
});
win.add(tableview);



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
    			font:{fontSize:'16dp',fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			top: 0,
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.unread[i].text,
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:'14dp'},
    			color:'#000',
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10,
    			top: 18
 
			});
			var flag = Titanium.UI.createImageView({
				image: '../images/flag_new_red.png',
				top: 7,
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
    			font:{fontSize:'16dp',fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 10,
    			top:0
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.read[i].text,
    			box:true,
    			notification_id: user.read[i].id,
    			id:user.read[i].target_id,
    			type: user.read[i].target_type,
    			font:{fontSize:'14dp'},
    			color:'#000',
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10,
    			top: 18
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.read[i].id,
                id:user.read[i].target_id,
                type: user.read[i].target_type,
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
         modalTableView.appendRow(fbRow);
          }
			 winModal.addEventListener('click', function(e){
			 	if(e.source.box != true){
 				winModal.hide();}
 			});
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
};
xhr.send();
}


var user = ''; 
function beginReloading(){
tableview.setData([]);
if ( Titanium.Network.online) {
	if (win.class_id != null){
		xhr = getMoodle2CourseContents(Titanium.App.Properties.getString("moodle_url_" + win.entity_id),Titanium.App.Properties.getString("moodle-token-" + win.entity_id),win.class_id);
		xhr.onload = function()
		{
			var response = this.responseText;
			var course = JSON.parse(response);
			for (var i = 0; i < course.length; i++)
			{
				if (course[i].modules.length > 0)
				{
					var section = Ti.UI.createTableViewSection({
						headerTitle: course[i].name
					});
					tableview.appendSection(section);
					for (var j = 0; j < course[i].modules.length; j++)
					{
						if (course[i].modules[j].modname == "resource")
						{
							var fileurl = course[i].modules[j].contents[0].fileurl + '&token=' + Titanium.App.Properties.getString("moodle-token-" + win.entity_id);
							var leftImage = Titanium.UI.createImageView({
								image: course[i].modules[j].modicon,
								hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
								height: 'auto',
								left: 2
							});
							var labelTitle = Titanium.UI.createLabel({
    							text:course[i].modules[j].name,
    							hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
    							font:{fontSize:16,fontWeight:'bold'},
    							color:'#000',
   								width:'auto',
    							textAlign:'left',
    							left: 27
							});
							if (j == 0){
								var fbRow = Titanium.UI.createTableViewRow({
 	         					header:course[i].name,
               					 backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
							//	hasDetail:true,
								height:40
            				});
            			
						} else {
            				var fbRow = Titanium.UI.createTableViewRow({
                				backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
               	 				FileUrl: fileurl,
							//	hasDetail:true,
								height:40
            				});
        				}
        				fbRow.add(leftImage);
        				fbRow.add(labelTitle);
        				tableview.appendRow(fbRow);
						} else if (course[i].modules[j].modname == "page")
						{
							var fileurl = course[i].modules[j].contents[0].fileurl + '&token=' + Titanium.App.Properties.getString("moodle-token-" + win.entity_id);
							var leftImage = Titanium.UI.createImageView({
								image: course[i].modules[j].modicon,
								hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
								height: 'auto',
								left: 2
							});
							var labelTitle = Titanium.UI.createLabel({
    							text:course[i].modules[j].name,
    							hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
    							font:{fontSize:16,fontWeight:'bold'},
    							color:'#000',
   								width:'auto',
    							textAlign:'left',
    							left: 27
							});
							if (j == 0){
								var fbRow = Titanium.UI.createTableViewRow({
 	         					header:course[i].name,
               					 backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
								hasDetail:true,
								height:40
            				});
            			
						} else {
            				var fbRow = Titanium.UI.createTableViewRow({
                				backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
               	 				FileUrl: fileurl,
								hasDetail:true,
								height:40
            				});
        				}
        				fbRow.add(leftImage);
        				fbRow.add(labelTitle);
        				tableview.appendRow(fbRow);
						}  else if (course[i].modules[j].modname == "url")
						{
							var fileurl = course[i].modules[j].contents[0].fileurl + '&token=' + Titanium.App.Properties.getString("moodle-token-" + win.entity_id);
							var leftImage = Titanium.UI.createImageView({
								image: "../images/www.png",
								hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
								height: 'auto',
								width: '24',
								left: 2
							});
							var labelTitle = Titanium.UI.createLabel({
    							text:course[i].modules[j].name,
    							hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
    							font:{fontSize:16,fontWeight:'bold'},
    							color:'#000',
   								width:'auto',
    							textAlign:'left',
    							left: 27
							});
							if (j == 0){
								var fbRow = Titanium.UI.createTableViewRow({
 	         					header:course[i].name,
               					 backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
								height:40
            				});
            			
						} else {
            				var fbRow = Titanium.UI.createTableViewRow({
                				backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
               	 				FileUrl: fileurl,
							//	hasDetail:true,
								height:40
            				});
        				}
        				fbRow.add(leftImage);
        				fbRow.add(labelTitle);
        				tableview.appendRow(fbRow);
						}
					}
				}
			}
		};
		xhr.send();
	} else {	
	xhr = getDataFromMoodle(win.Moodurl);
	xhr.onload = function(){
	var response = this.responseText;
	var regex = /href=.+(http.+mod\/resource\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/ig;
	var c = 0;
	while((hits = regex.exec(response)) !== null) {
		var leftImage = Titanium.UI.createImageView({
				image: hits[2],
				hiddenTitle: hits[3],
                FileUrl: hits[1],
				height: 'auto',
				left: 2
			});
			var labelTitle = Titanium.UI.createLabel({
    			text:hits[3],
    			hiddenTitle: hits[3],
                FileUrl: hits[1],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 20
			});
		if (c == 0){
			var fbRow = Titanium.UI.createTableViewRow({
 	         	header:'File Attachments',
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
		} else {
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
        }
        c++;
        fbRow.add(leftImage);
        fbRow.add(labelTitle);
        tableview.appendRow(fbRow);
	}
	var regex = /(http.+quiz\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/ig;
	var c = 0;
	while((hits = regex.exec(response)) !== null) {
		var leftImage = Titanium.UI.createImageView({
				image: hits[2],
				hiddenTitle: hits[3],
                FileUrl: hits[1],
				height: 'auto',
				left: 2
			});
			var labelTitle = Titanium.UI.createLabel({
    			text:hits[3],
    			hiddenTitle: hits[3],
                FileUrl: hits[1],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 20
 
			});
		if (c == 0){
			var fbRow = Titanium.UI.createTableViewRow({
 	         	header:'Homework',
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
		} else {
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
        }
        c++;
        fbRow.add(leftImage);
        fbRow.add(labelTitle);
        tableview.appendRow(fbRow);
	}
};
xhr.send();
}
} else {
	alert("Network problems.");
}

};
tableview.addEventListener('click', function(e)
{
	var win1 = Titanium.UI.createWindow({  
    					title:e.source.hiddenTitle,
   	 					backgroundColor:'#ecfaff',
   	 					layout:'absolute',
   	 					navTintColor: "#ffffff",
    					statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   	    				translucent: false,
   	 					barColor: '#46a546'
						});

					url2 = e.source.FileUrl;
					var webview = Titanium.UI.createWebView({url:url2});
					win1.add(webview);
					win.navGroup.openWindow(win1,{animated:false});
		
});
win.addEventListener('focus', function() 
{
  if ( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE ) {
    beginReloading();
    reloadNotifications();
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});


