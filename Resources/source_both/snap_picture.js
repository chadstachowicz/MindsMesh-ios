var win = Titanium.UI.currentWindow

Titanium.Media.showCamera({

  success:function(event)
  {
  	var t1 = Ti.UI.create3DMatrix();
	t1 = t1.rotate(180,0,1,0);
        var cameraView = Ti.UI.createImageView({
            width: 320,
            height: 480,
            top: 0,
            left: 0,
            image: event.media,
        });
        cameraView.transform = t1;
        var imageNew = cameraView.toImage(function(e){
            // Save Image
            var filename1 = Titanium.Filesystem.applicationDataDirectory + "/NAMEOFTHEPICTURE.png";
            f = Titanium.Filesystem.getFile(filename1);
            f.write(e.blob);
            Titanium.Media.saveToPhotoGallery(f);
            Titanium.Media.hideCamera();
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
        thumbCameraView.add(thumbOverImage);
        win.add(thumbCameraView);
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
    allowImageEditing:true
  //autohide:false   // tell the system not to auto-hide and we'll do it ourself
});