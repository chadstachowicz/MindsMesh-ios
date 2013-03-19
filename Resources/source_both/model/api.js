function errorHTTPClient(request, mode, url, data, errObj, errMsg)
{   
	if (request.readyState == 4 && request.retries < 3)
    {   request.open(mode,url);
        request.setRequestHeader("Content-Type","application/json");
        request.send(data);
        request.retries++;
    }
    else
    {   var desc = errObj.error.substring(errObj.error.indexOf("Description=")+12,errObj.error.lastIndexOf("}"));
        errorAlert(L("Comms Error Title"),errMsg+desc);
        request.abort();
    }
};
function createHttpClient(mode,url,data,header)
{
	var xhr = Titanium.Network.createHTTPClient({timeout:6000});
	xhr.retries = 0;
	xhr.open(mode,url);
	if(header == 'FILE'){
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
	} else if (header != 'NONE'){
		xhr.setRequestHeader("Content-Type", "application/json");
	if(Titanium.Platform.osname == 'android'){
	var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
	xhr.setRequestHeader('User-Agent', androidUserAgent);}
	}
	xhr.onerror = function requestFailed(e) 
	{
		errorHTTPClient(xhr, mode, url, data, e, L("Comms Error Message"));
	};
	return xhr;
}
function getNotificationsGrouped(accessToken)
{
	url = 'http://192.168.1.20:5000/api/v1/notifications/grouped/with_parents?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postRegisterDevice(accessToken,data)
{
	url = 'http://192.168.1.20:5000/api/v1/home/register_device?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicCreate(accessToken,data)
{
	url = 'http://192.168.1.20:5000/api/v1/topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postEntityJoin(accessToken,data)
{
	url = 'http://192.168.1.20:5000/api/v1/home/entities?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postPostCreate(accessToken,data)
{
	url = 'http://192.168.1.20:5000/api/v1/posts?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data,'FILE');
	return xhr;
}
function postReplyCreate(accessToken,postId,data)
{
	url = 'http://192.168.1.20:5000/api/v1/posts/' + postId + '/replies?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicJoin(accessToken,topicId)
{
	url = 'http://192.168.1.20:5000/api/v1/topics/' + topicId + '/join.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicSearch(accessToken,data)
{
	url = 'http://192.168.1.20:5000/api/v1/home/search_topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postLogin(FBaccessToken)
{
	url = 'http://192.168.1.20:5000/api/v1/session/login?fb_access_token=' + FBaccessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicLeave(accessToken,topicId)
{
	url = 'http://192.168.1.20:5000/api/v1/topics/' + topicId + '/leave.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postNotificationMarkAsRead(accessToken,notificationId)
{
	url = 'http://192.168.1.20:5000/api/v1/notifications/' + notificationId + '/mark_as_read?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function getPostsWithFamily(accessToken,before)
{
	if(before)
	{
		url = 'http://192.168.1.20:5000/api/v1/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'http://192.168.1.20:5000/api/v1/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getPostWithChildren(accessToken,postId)
{
	url = 'http://192.168.1.20:5000/api/v1/posts/' + postId + '/with_children?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getNotification(accessToken,notificationId)
{
	url = 'http://192.168.1.20:5000/api/v1/notifications/' + notificationId + '?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getUserWithChildren(accessToken,userId)
{
	url = 'http://192.168.1.20:5000/api/v1/users/' + userId + '/with_children.json?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getTopicPostsWithFamily(accessToken,topicId,before)
{
	if(before)
	{
		url = 'http://192.168.1.20:5000/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'http://192.168.1.20:5000/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postLoginToMoodle(url,data)
{
	xhr = createHttpClient('POST',url,data,'NONE');
	return xhr;
}
function postMethodToMoodleRooms(url,data)
{
	xhr = createHttpClient('POST',url,"",'NONE');
	return xhr;
	
}
function getDataFromMoodle(url)
{
	xhr = createHttpClient('GET',url,"",'NONE');
	return xhr;
}
function postLoginToMoodle(url,data)
{
	xhr = createHttpClient('POST',url,data,'NONE');
	return xhr;
}
function s3upload(name, file, callback) {
//	var sha = require('model/sha-aws.js').load();     //var sha = ; 	// file comes from this URL's project: http://aws.amazon.com/code/Amazon-S3/3236824658053653
//    var utf = require('model/UTF8.js').load(); 		// code for this file from this URL: http://www.webtoolkit.info/javascript-utf8.html
    Ti.include('date.js');		// file comes from this URL: http://www.mattkruse.com/javascript/date/source.html
	
	
	alert("rawr");
	var AWSAccessKeyID = 'AKIAIKFVJ3EMAIBXELBQ';
	var AWSSecretAccessKey = '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';
 
	var AWSBucketName = 'mindsmesh.com';
	var AWSHost = 's3.amazon.com';
	
	var currentDateTime = formatDate(new Date(),'E, d MMM yyyy HH:mm:ss') + ' -0600';
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onerror = function(e) {
		var errorDetails = e.error + '\n';
		errorDetails += xhr.responseText;
		Ti.API.info(errorDetails);
	};
	
	xhr.onload = function() {
	    Ti.API.info('got my response, http status code ' + this.status);
	    callback.call();
	};
	
	//ensure we have time to upload
 	xhr.setTimeout(99000);
	
	// true or false if it's asynchronous or not (last parameter below for xhr.open)
	xhr.open('PUT', 'http://' + AWSHost + '/' + AWSBucketName + '/' + name, false);
 
	var StringToSign = 'PUT\n\n\n' + currentDateTime + '\nx-amz-acl:public-read\n/'+AWSBucketName+'/' + name;
 
	var AWSSignature = b64_hmac_sha1(AWSSecretAccessKey, Utf8.encode(StringToSign));
	var AuthorizationHeader = 'AWS ' + AWSAccessKeyID + ':' + AWSSignature;
	
	xhr.setRequestHeader('Authorization', AuthorizationHeader);
	xhr.setRequestHeader('X-Amz-Acl', 'public-read');
	xhr.setRequestHeader('Host', AWSHost);
	xhr.setRequestHeader('Date', currentDateTime);
 
	xhr.send(file);
}

