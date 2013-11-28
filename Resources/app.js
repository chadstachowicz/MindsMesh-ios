Ti.include("source_both/model/api.js");
Ti.App.myCurrentWindow = null;
var Cloud = require('ti.cloud');
var win = Titanium.UI.createWindow({  
    backgroundColor:'#ecfaff',
});
 var fb = require('facebook');
 fb.appid = "391884850858794";
 fb.permissions = ['email'];
 fb.forceDialogAuth = true;



//// ---- Menu window, positioned on the left
var menuWindow = Ti.UI.createWindow({
    top:0,
    backgroundColor:"#252525",
    left:0,
    width:Titanium.Platform.displayCaps.platformWidth,
});
//// ---- Menu Table
// Menu Titles
	
Titanium.App.addEventListener('reloadMenu', function(e)
{   
	reloadMenu();
});
Titanium.App.addEventListener('redirectAfterLogin', function(e)
{   
	redirectAfterLogin();
});



// Tableview
var menuTableView = Ti.UI.createTableView({
    backgroundColor:'#252525',
    separatorColor: '#000',
    width: 260,
    top: 20,
    left:0
});
menuTableView.addEventListener('click', function(e)
{
	if (e.source.id == 1){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:1});
   } else if (e.source.id == 4){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:4});
   } else if (e.source.id == 5){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:5});
   } else if (e.source.id == 6){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:6});
   } else if (e.source.id == 7){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, topic_id: e.source.extraData, entity_id: e.source.entity_id});
   } else if (e.source.id == 2){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:2, group_id: e.source.extraData});
   } else if (e.source.id == 8){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:8});
   } else if (e.source.id == 9){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:9});
   } else if (e.source.id == 10){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:10});
   } else if (e.source.id == 11){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:11});
   }
});

var menuMoodle = [];
var menuMoodleSSO = [];
var menuEntity = [];
var menuName = [];
var groupName = [];

function reopenLogin()	{
	win.open();
}
var menuTitles = [];
function reloadMenu(){
	menuWindow.add(menuTableView);
	menuWindow.open();
	menuTableView.data = [];
	xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
	xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	var fbRow1 = Titanium.UI.createTableViewRow({
 	         	header:'Menu',
 	         	id: 1,
                backgroundColor:'#252525',
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'News Feed',
    			id: 1,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				id: 1,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow1.add(labelIcon);
fbRow1.add(labelTitle);
var fbRow6 = Titanium.UI.createTableViewRow({
				header:'Settings',
                backgroundColor:'#252525',
                id: 6,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Log Out',
    			font:{fontSize:16},
    			id: 6,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/exit.png',
				id: 6,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow6.add(labelIcon);
fbRow6.add(labelTitle);
var fbRow8 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 8,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Add Class....',
    			id: 8,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 8,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow8.add(labelIcon);
fbRow8.add(labelTitle);
var fbRow11 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 11,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Add Group....',
    			id: 11,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 11,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow11.add(labelIcon);
fbRow11.add(labelTitle);
var fbRow9 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 9,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Campus Map',
    			id: 9,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/04_maps.png',
				id: 9,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow9.add(labelIcon);
fbRow9.add(labelTitle);
var fbRow10 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 10,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Moodle Account',
    			font:{fontSize:16},
    			id: 10,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
var labelIcon = Titanium.UI.createImageView({
				image: 'images/run.png',
				id: 10,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow10.add(labelIcon);
fbRow10.add(labelTitle);
var fbRow11 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 11,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Reload Menu',
    			font:{fontSize:16},
    			id: 11,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
var labelIcon = Titanium.UI.createImageView({
				image: 'images/gtk_refresh.png',
				id: 11,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow11.add(labelIcon);
fbRow11.add(labelTitle);
	menuTitles = [fbRow1];
	for(c=0;c<user.topic_users.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 7,
				height:40,
				moodle: false,
				number: user.topic_users[c].topic.number,
				entity_id: user.topic_users[c].topic.entity_id,
				extraData: user.topic_users[c].topic.id
            });
            
            if (c==0){fbRow.header = 'Classes'}
			var labelTitle = Titanium.UI.createLabel({
    			text:user.topic_users[c].topic.number,
    			font:{fontSize:16},
    			id: 7,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45,
    			moodle: false,
    			entity_id: user.topic_users[c].topic.entity_id,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 7,
				left: 4,
				top: 4,
				height:32,
				width:32,
				moodle: false,
				entity_id: user.topic_users[c].topic.entity_id,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			fbRow.add(labelIcon);
			fbRow.add(labelTitle);
			menuName[user.topic_users[c].topic.id] = user.topic_users[c].topic.number;
			moodle_entity_string = "moodle_entity_" + user.topic_users[c].topic.entity_id;
			moodle_url_string = "moodle_url_" + user.topic_users[c].topic.entity_id;
			moodle_sso_string = "moodle_sso_" + user.topic_users[c].topic.entity_id;
			if (user.topic_users[c].topic.entity_id == Titanium.App.Properties.getString(moodle_entity_string)){
				fbRow.moodle = true;
				labelTitle.moodle = true;
				labelIcon.moodle = true;
				menuMoodle[user.topic_users[c].topic.id] = Titanium.App.Properties.getString(moodle_url_string);
				menuMoodleSSO[user.topic_users[c].topic.id] = Titanium.App.Properties.getString(moodle_sso_string);
				menuEntity[user.topic_users[c].topic.entity_id] = user.topic_users[c].topic.entity_id;
			}
			fbRow.add(labelTitle);
            menuTitles.push(fbRow);
       }
     //   menuTitles.push(fbRow8);
        for(c=0;c<user.group_users.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 2,
				height:40,
				moodle: false,
				extraData: user.group_users[c].group.id
            });
            
            if (c==0){fbRow.header = 'Groups'}
			var labelTitle = Titanium.UI.createLabel({
    			text:user.group_users[c].group.name,
    			name:user.group_users[c].group.name,
    			font:{fontSize:16},
    			id: 2,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45,
    			moodle: false,
                extraData: user.group_users[c].group.id
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 2,
				left: 4,
				top: 4,
				height:32,
				width:32,
				moodle: false,
				name: user.group_users[c].group.name,
                extraData: user.group_users[c].group.id
			});
			fbRow.add(labelIcon);
			groupName[user.group_users[c].group.id] = user.group_users[c].group.name;
			fbRow.add(labelTitle);
            menuTitles.push(fbRow);
        }
     //   menuTitles.push(fbRow11);
        menuTitles.push(fbRow6);
   if(Titanium.App.Properties.getString("moodle_entity_2") != null)
   {
		menuTitles.push(fbRow10);
		}
		menuTitles.push(fbRow11);
		menuTableView.data = menuTitles;
};
	xhr.send();
}
function redirectAfterLogin() {
	if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad'){
	Titanium.Network.registerForPushNotifications({
	   			 types: [
        			Titanium.Network.NOTIFICATION_TYPE_BADGE,
        			Titanium.Network.NOTIFICATION_TYPE_ALERT
   				 ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Cloud.Users.login({
            login: 'contact@mindsmesh.com',
            password: 'password'
        }, function (e) {
            if (e.success) {
        Cloud.PushNotifications.subscribe({
			channel: 'alert',
			type:'ios',
			device_token: deviceToken
			}, function (e) {
				if (e.success) {
					var env = 'development';
 					if(Ti.App.Properties.getString('production')=='true'){
 						env = 'production';
 					}
        			var postData = {'token': deviceToken,
						'model' : escape(Titanium.Platform.model),
						'os': escape(Titanium.Platform.osname),
						'name': escape(Titanium.Platform.model),
						'environment': env};
        			request = postRegisterDevice(Titanium.App.Properties.getString("mmat"),postData);
        			request.onload = function()
        			{
        	
       				 };
					request.send(postData);
				} else {
					alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
            } else {
              //  alert('Error:\\n' +((e.error && e.message) || JSON.stringify(e)));
            }
        });
        Ti.API.info("Push notification device token is: "+deviceToken);
        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
	},
  		  error:function(e)
   			 {
   			
 
   			 },
  		  callback:function(e)
  			  {
				    xhr = getNotification(Titanium.App.Properties.getString("mmat"),e.data.notification_id);
					xhr.onload = function(){
						var response = this.responseText;
						user = JSON.parse(response);
						if(user.target_type=="Topic"){
							var win1 = Titanium.UI.createWindow({
								backgroundColor:'#ecfaff',
								url:'source_both/feed.js',
								navTintColor: "#ffffff",
								backgroundColor:"#CDC9C9",
								statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   								translucent: false,
    							navGroup: navGroup,
    							barColor: '#46a546',
							});
							win1.topic_id= user.target_id;
						} else {
						var win1 = Titanium.UI.createWindow({  
    						title:'Single Post',
    						url:'source_both/post.js',
    						navTintColor: "#ffffff",
							statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   							translucent: false,
   							backgroundColor:"#CDC9C9",
    						barColor: '#46a546',
    						navGroup: navGroup
						});
						win1.postid = user.target_id;
						win1.fullname = user.user.name;
						win1.photo_url = user.user.photo_url;
						}
						navGroup.openWindow(win1,{animated:false});
					};
					xhr.send();
   			 }		
 
		});
}
	reloadMenu();
//// ---- Window with navigationGroup
var navWindow = Ti.UI.createWindow({
	//height:Titanium.Platform.displayCaps.platformHeight,
    width:Titanium.Platform.displayCaps.platformWidth, // Set the width of the sliding window to avoid cut out from animation
	backgroundColor:"#e2e7ed"
});


Ti.Gesture.addEventListener('orientationchange',function(e){
        navGroup.width = Titanium.Platform.displayCaps.platformWidth;
    });


var win1 = Titanium.UI.createWindow({  
    url:'source_both/feed.js',
    navTintColor: "#ffffff",
    navTintColor: "#ffffff",
	backgroundColor:"#CDC9C9",
	statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   	translucent: false,
    barColor: '#46a546',
    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   	translucent: false,
});
	var win4 = Titanium.UI.createWindow({
   					url:'source_both/finish_verification.js',
    				barColor: '#46a546',
    				translucent: false,
   	    			backgroundColor:'#ecfaff',
    			 });
    			 var win9 = Titanium.UI.createWindow({  
    				title:'Moodle Account',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
   	    			navTintColor: "#ffffff",
				    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   				    translucent: false,
    			 });
if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad'){
if (Titanium.App.Properties.getString("num_entities") == 0){

var navGroup = Ti.UI.iOS.createNavigationWindow({
    window:win4,
    translucent:false,
    width:Titanium.Platform.displayCaps.platformWidth,
});
win4.navGroup = navGroup;
//} else if (Titanium.App.Properties.getString("num_entities") > 0 && Titanium.App.Properties.getString("moodle_entity_id") != false && Titanium.App.Properties.getString("num_topics") == 0){
//	
//	var navGroup = Ti.UI.iPhone.createNavigationGroup({
//    window:win9
//});
//win9.navGroup = navGroup;
} else {
var navGroup = Ti.UI.iOS.createNavigationWindow({
    window:win1,
    translucent:false,
    width:Titanium.Platform.displayCaps.platformWidth,
});
win1.navGroup = navGroup;
}
navGroup.open();
var dlg = Titanium.UI.createAlertDialog({
    			message:'Are you sure you want to logout', 
    			buttonNames: ['Logout','Cancel']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) {
   				 	Titanium.App.Properties.setString("logged_in", 'false');
   				 	navWindow.close();
   				 	fb.logout();
				reopenLogin();
				navGroup.close();
				menuWindow.close();
				Titanium.App.fireEvent('main-win-close');
				navWindow.close();
   				 } else if (ev.index == 1) { // clicked "No"
					dlg.hide();
   				 }
 			 });
} else {
	navWindow = win1;
}
Titanium.App.addEventListener('loadFeed', function(e)
{   
	reloadMenu();
	var win2 = Titanium.UI.createWindow({  
   					url:'source_both/feed.js',
   					navTintColor: "#ffffff",
    				barColor: '#46a546',
    				navGroup: navGroup,
    				statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        		 	translucent: false,
   	    			backgroundColor:"#CDC9C9",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
        		navGroup.openWindow(win2,{animated:false});
				Titanium.App.fireEvent('main-win-close');
});
Titanium.App.addEventListener('loadTopic', function(e)
{   
	var win7 = Titanium.UI.createWindow({  
    			navGroup: navGroup,
   	    		backgroundColor:'#CDC9C9',
    			url:'source_both/feed.js',
    			navTintColor: "#ffffff",
    			barColor: '#46a546',
    			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        		translucent: false,
	});
				win7.topic_id = topic_id;
				win7.moodle = moodle;
				win7.class_number = class_number;
				navGroup.openWindow(win7,{animated:false});
				Titanium.App.fireEvent('main-win-close');
});
Titanium.App.addEventListener('touch-slide', function(e)
{   
	
	
	    navGroup.animate({
            left:e.cords,
            duration:20
        });
        // Defining coordinates as the final left position
        navGroup.left = e.cords;
});
Titanium.App.addEventListener('nav-menu-button', function(e)
{
        // If the menu is opened
    var menu_id = e.menu_id;
    var topic_id = e.topic_id;
    var entity_id = e.entity_id;
    var group_id = e.group_id;
    var group_name = groupName[group_id];
    var moodle = menuMoodle[topic_id];
    var moodle_sso = menuMoodleSSO[topic_id];
    var entity_id = menuEntity[entity_id];
    var class_number = menuName[topic_id];
    if(e.data == true){
        var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        navAnimate.addEventListener('complete', function(e){
        	 if(menu_id == 1)
        	 {
        	 	var win2 = Titanium.UI.createWindow({  
   					url:'source_both/feed.js',
    				barColor: '#46a546',
    				navGroup: navGroup,
    				navTintColor: "#ffffff",
    				statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   	    			backgroundColor:"#CDC9C9",
   	    			translucent: false,
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
        		navGroup.openWindow(win2,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 4) {
        	 	var win4 = Titanium.UI.createWindow({  
    				title:'Verify Email',
   					url:'source_both/join_school.js',
   					translucent: false,
    				barColor: '#46a546',
    				navGroup: navGroup,
   	    			backgroundColor:'#ecfaff',
    			 });
        		navGroup.openWindow(win4,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 5) {
        	 	var win5 = Titanium.UI.createWindow({  
    				title:'Moodle',
   					url:'source_both/moodle_account.js',
   					statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   					translucent: false,
    				barColor: '#46a546',
    				navTintColor: "#ffffff",
				    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   				    translucent: false,
    				navGroup: navGroup,
   	    			backgroundColor:"#e2e7ed",
    			 });
        		navGroup.openWindow(win5,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 6) {
 			 dlg.show();
			} else if(menu_id == 7) {
				var win7 = Titanium.UI.createWindow({  
    			navGroup: navGroup,
   	    		backgroundColor:'#CDC9C9',
    			url:'source_both/feed.js',
    			navTintColor: "#ffffff",
    			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   				translucent: false,
    			barColor: '#46a546',
				});
				win7.topic_id = topic_id;
				win7.moodle = moodle;
				win7.moodle_sso = moodle_sso;
				win7.entity_id = entity_id;
				win7.class_number = class_number;
				navGroup.openWindow(win7,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 2) {
				var win7 = Titanium.UI.createWindow({  
    			navGroup: navGroup,
   	    		backgroundColor:'#CDC9C9',
    			url:'source_both/feed.js',
    			navTintColor: "#ffffff",
    			barColor: '#46a546',
    			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   				translucent: false,
				});
				win7.group_id = group_id;
				win7.group_name = group_name;
				navGroup.openWindow(win7,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 8) {
				var win8 = Titanium.UI.createWindow({  
    				title:'Search Classes',
   	 				url:'source_both/search_topics.js',
   	 				navGroup: navGroup,
   	 				backgroundColor:'#ecfaff',
   	 				layout:'absolute',
   	 				translucent: false,
   	 				barColor: '#46a546',
   	 				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
				});
				navGroup.openWindow(win8,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 9) {
				var win1 = Titanium.UI.createWindow({
   	 					url:'source_both/campus_map.js',
   	 					backgroundColor:'#ecfaff',
   	 					translucent: false,
   	 					navGroup: navGroup,
   	 					layout:'absolute',
   	 					barColor: '#46a546'
				});
				navGroup.openWindow(win1,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 10) {
        	 	var win9 = Titanium.UI.createWindow({  
    				title:'Moodle Account',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
    				navTintColor: "#ffffff",
				    statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   				    translucent: false,
    				navGroup: navGroup,
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
        		navGroup.openWindow(win9,{animated:false});
				navGroup.closeWindow(Ti.App.myCurrentWindow,{animated:false});
			} else if(menu_id == 11) {
        	 	reloadMenu();
			}
        });
        navGroup.animate(navAnimate);
        Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:false});
    }
    // If the menu isn't opened
    else{
        navGroup.animate({
            left:260,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
       Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:true});
    }
});
win.close();
}

var user = '';
fb.addEventListener('login', function(e) {
	if (e.data != null ){
		Titanium.App.Properties.setString("fbid",e.data["id"]);	
		xhr = postLogin(fb.accessToken);
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
					moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
					moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
					entity_user_string = "entity_user_" + user.entity_users[i].id;
					Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
					Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString(moodle_sso_string,user.entity_users[i].entity.moodle_sso);
					Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("logged_in", 'true');
			Titanium.App.Properties.setString("name",user.name);
			Titanium.App.Properties.setString("num_entities",user.entity_users.length);
			Titanium.App.Properties.setString("num_topics",user.topic_users.length);
			Titanium.App.Properties.setString("userid",user.id);
			Titanium.App.Properties.setString("mmat", user.access_token);
			Titanium.App.Properties.setString("photo_url", user.photo_url);
			redirectAfterLogin();
			
		};
		xhr.send();
	}
});
if (Titanium.Platform.osname == 'iphone')
{
var pict = Titanium.UI.createImageView({
				image: 'images/Mindsmesh_logo_highres.png',
				top: 50,
				height:200,
				width:300,
			});
} else {
	var pict = Titanium.UI.createImageView({
				image: 'images/Mindsmesh_logo_highres.png',
				top: 50,
				bottom: 50
			});
}
win.add(pict);
	var loginButton = Ti.UI.createButton(
	{
    	title: 'Login',
   		toggle:false,
    	height: 30,
    	width:200,
		bottom: 30
	});
	loginButton.addEventListener('click',function(e){
		var shareWhoModal2 = Ti.UI.createWindow(
		{
    		backgroundColor : '#B0000000',
    		zIndex: 1
		});
		var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 		var headerLabel = Ti.UI.createLabel({
		text:"Please login below",
		font:{fontSize:16,fontWeight:'bold'},
		textAlign:'center',
		box: true,
		top: 15
	});
	var seperatorPhone = Ti.UI.createView({
					backgroundColor: "#808080",
					width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
					top: 7,
					box: true,
					height:2,
				});
	var email = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'Email',
    	width:250,
    	top: 10,
    	bottom: 10,
    	box:true,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var password = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'Password',
    	passwordMask:true,
    	width:250,
    	bottom: 20,
    	box:true,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var signinButton = Ti.UI.createButton(
	{
    	title: 'Sign In',
   		toggle:false,
    	height: 30,
    	box:true,
    	width:200,

	});
	signinButton.addEventListener('click',function(e){
	
	    var postData = {'email': email.value, 'password': password.value};
		xhr = postLogin("",postData);
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
					moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
					moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
					entity_user_string = "entity_user_" + user.entity_users[i].id;
					Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
					Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString(moodle_sso_string,user.entity_users[i].entity.moodle_sso);
					Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("logged_in", 'true');
			Titanium.App.Properties.setString("name",user.name);
			Titanium.App.Properties.setString("num_entities",user.entity_users.length);
			Titanium.App.Properties.setString("num_topics",user.topic_users.length);
			Titanium.App.Properties.setString("userid",user.id);
			Titanium.App.Properties.setString("mmat", user.access_token);
			Titanium.App.Properties.setString("photo_url", user.photo_url);
			redirectAfterLogin();
			
		};
		xhr.onerror = function(e){
			var response = this.responseText;
			alert('Login failed, please check credentials and try again.');
		};
		xhr.send(postData);
		});
				var orLabel2 = Ti.UI.createLabel({
				text:"or",
				font:{fontSize:16,fontWeight:'bold'},
				box: true,
				top: 30
			}); 
 		var view = Ti.UI.createView(
    	{
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
   		 view.add(headerLabel);
   		 view.add(seperatorPhone);
   		 view.add(email);
   		 view.add(password);
   		 view.add(signinButton);
   		 view.add(orLabel2);
   		 view.add(fb.createLoginButton({
		style:Ti.Facebook.BUTTON_STYLE_WIDE,
		top: 30
	}));
   		 shareWhoModal2.add(view);
		 shareWhoModal2.addEventListener('click', function(e)
		 {
		 	if(e.source != "[object TiUITextField]")
			{
   				email.blur();
   				password.blur();
 			}
			if(e.source.box != true && e.source != "[object TiUITextField]")
			{
   				shareWhoModal2.close();
 			}
		 });
		 shareWhoModal2.open();
	});
	
	var orLabel = Ti.UI.createLabel({
		text:"or",
		bottom: 68
	});
		
	var signupButton = Ti.UI.createButton(
	{
    	title: 'Sign Up',
   		toggle:false,
    	height: 30,
    	width:200,
		bottom: 90
	});
	signupButton.addEventListener('click',function(e){
		var shareWhoModal3 = Ti.UI.createWindow(
		{
    		backgroundColor : '#B0000000',
    		zIndex: 1
		});
		var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
   		var name = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'First and Last Name',
    	width:250,
    	box: true,
    	top: 10,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
   	var email = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'School Email',
    	width:250,
    	box: true,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var password = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'Password',
    	box: true,
    	passwordMask:true,
    	width:250,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var passwordconf = Titanium.UI.createTextField({
   	 	height:35,
    	hintText: 'Confirm Password',
    	box: true,
    	passwordMask:true,
    	width:250,
    	bottom: 20,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var finishsignupButton = Ti.UI.createButton(
	{
    	title: 'Finish Sign Up',
   		toggle:false,
    	height: 30,
    	box: true,
    	width:200,

	});
	finishsignupButton.addEventListener('click', function(e){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/; 
		if(reg.test(email.value) == false) {
		   alert("This is not a valid educational email.");
		} else if (password.value != passwordconf.value) {
		   alert("Passwords don't match.");
		}  else if (name.value.length < 4) {
		   alert("Please enter your first and last name.");
		} else {
			var postData = {'name': name.value, 'email': email.value, 'password': password.value, 'password_confirmation': passwordconf.value};
			xhr = postCreateUser(postData);
			xhr.onload = function(e){
				    var response = this.responseText;
					var user = JSON.parse(response);
					for (i=0;i<user.entity_users.length;i++){
						if (user.entity_users[i].entity.moodle_url != null)
						{
							moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
							moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
							moodle_sso_string = "moodle_sso_" + user.entity_users[i].entity.id;
							entity_user_string = "entity_user_" + user.entity_users[i].id;
							Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
							Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
							Titanium.App.Properties.setString(moodle_sso_string,user.entity_users[i].entity.moodle_sso);
							Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
						}	
					};
					Titanium.App.Properties.setString("logged_in", 'true');
					Titanium.App.Properties.setString("name",user.name);
					Titanium.App.Properties.setString("num_entities",user.entity_users.length);
					Titanium.App.Properties.setString("num_topics",user.topic_users.length);
					Titanium.App.Properties.setString("userid",user.id);
					Titanium.App.Properties.setString("mmat", user.access_token);
					Titanium.App.Properties.setString("photo_url", user.photo_url);
					var navWindow = Ti.UI.createWindow({
						//height:Titanium.Platform.displayCaps.platformHeight,
   						width:Titanium.Platform.displayCaps.platformWidth, // Set the width of the sliding window to avoid cut out from animation
						backgroundColor:"#e2e7ed"
					});
				    var win4 = Titanium.UI.createWindow({  
   						url:'source_both/finish_verification.js',
    					barColor: '#46a546',
    					statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
   	    				backgroundColor:'#ecfaff',
    			 	});
    			 	var navGroup = Ti.UI.iOS.createNavigationWindow({
    					window:win4,
    					translucent:false,
    					width:Titanium.Platform.displayCaps.platformWidth,
					});
					win4.navGroup = navGroup;
					navWindow.add(navGroup);
					navWindow.open();
			};
			xhr.onerror = function(e){
				var response = this.responseText;
			};
			xhr.send(postData);


		}
	});
	var headerLabel = Ti.UI.createLabel({
		text:"Provide the information below to finish signup",
		font:{fontSize:16,fontWeight:'bold'},
		box: true,
		textAlign:'center',
		top: 15
	});
	var seperatorPhone = Ti.UI.createView({
					backgroundColor: "#808080",
					width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
					top: 7,
					box: true,
					height:2,
				});
		var orLabel2 = Ti.UI.createLabel({
				text:"or",
				box: true,
				font:{fontSize:16,fontWeight:'bold'},
				top: 10
			});
 		var view = Ti.UI.createView(
    	{
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
   		 view.add(headerLabel);
   		 view.add(seperatorPhone);
   		 view.add(name);
   		 view.add(email);
   		 view.add(password);
   		 view.add(passwordconf);
   		 view.add(finishsignupButton);
   		 view.add(orLabel2);
   		 view.add(fb.createLoginButton({
		style:Ti.Facebook.BUTTON_STYLE_WIDE,
		top: 10
	}));
   		 shareWhoModal3.add(view);
		 shareWhoModal3.addEventListener('click', function(e)
		 {
			if(e.source != "[object TiUITextField]")
			{
				name.blur();
   				email.blur();
   				password.blur();
   				passwordconf.blur();
 			}
			if(e.source.box != true && e.source != "[object TiUITextField]")
			{
   				shareWhoModal3.close();
 			}
		 });
		 shareWhoModal3.open();
	});
	win.add(loginButton);
	win.add(orLabel);
	win.add(signupButton);

if(Titanium.App.Properties.getString("logged_in") == 'true' && Titanium.App.Properties.getString("num_entities") > 0  && fb.loggedIn == false)
{
	redirectAfterLogin();
} else {
	win.open();
}

