Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';

Titanium.App.addEventListener('main-win-close', function(e)
{
	win.close();
});
var label1 = Titanium.UI.createLabel({
	text: 'Once you have verified the link which arrives in your email.  Please click the Confirmed button below.',
	top: 100,
	height:'auto',
	left: 17,
	width: 320,
	
});

var confirm = Titanium.UI.createButton({
            		title: 'Confirmed',
            		top: 17,
            		width: 230,
					height: 30,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					confirm.addEventListener('click', function(e)
					{
			
						xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
						xhr.onload = function(){
						var response = this.responseText;
						var user = JSON.parse(response);
						for (i=0;i<user.entity_users.length;i++){
							if (user.entity_users[i].entity.moodle_url != null)
							{
								moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
								moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
								entity_user_string = "entity_user_" + user.entity_users[i].id;
								Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
								Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
								Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
							}	
						}
						if(user.entity_users.length > 0)
						{
							Titanium.App.Properties.setString("num_entities",user.entity_users.length);
							Titanium.App.fireEvent('redirectAfterLogin');
							
						} else {
							alert('You have not confirmed the email we have sent you.  If you would like to resend it to yourself please click the Re-enter Email button.')
						}
						}
						xhr.send();
					
					});
					confirm.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					confirm.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});
					
					var remail = Titanium.UI.createButton({
            		title: 'Re-enter Email',
            		top: 17,
            		width: 230,
					height: 30,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					remail.addEventListener('click', function(e)
					{
						var win4 = Titanium.UI.createWindow({  
    						title:'Verify Email',
   							url:'join_school.js',
    						barColor: '#46a546',
    						navGroup: win.navGroup,
   	    					backgroundColor:'#ecfaff',
       						moving:false, // Custom property for movement
       						axis:0 // Custom property for X axis
    					 });
    					 win.navGroup.open(win4,{animated:false});
    					 
					});
					remail.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					remail.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});
win.add(label1);
win.add(confirm);
win.add(remail);




