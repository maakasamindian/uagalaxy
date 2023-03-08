 var firebaseConfig = {
    apiKey: "AIzaSyBr2Ld829X4fDpbTi-GKYFZVquPt5WklJ4",
  authDomain: "auworld.firebaseapp.com",
  databaseURL: "https://auworld-default-rtdb.firebaseio.com",
  projectId: "auworld",
  storageBucket: "auworld.appspot.com",
  messagingSenderId: "173892554240",
  appId: "1:173892554240:web:8aac5a987bae9c2e3a12e5",
  measurementId: "G-W0VYSQ7VL2"  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

function upload(){
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var posttitle=document.getElementById('title').value;
    var postdaname=document.getElementById('dataname').value;
    var postalt=document.getElementById('alt').value;
    var pictitle=document.getElementById('Ptitle').value;
    var postkeyowrds=document.getElementById('keywords').value;
    var postabout=document.getElementById('about').value;
    var postdate=document.getElementById('date').value;
    var postid=document.getElementById('id').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      //handle error here
      console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set({
                 postaltau:postalt,
                 postaboutau:postabout,
                 postdanameau:postdaname,
                 postdateau:postdate,
                 postidau:postid,
                 postkeyowrdsau:postkeyowrds,
                 posttitleau:posttitle,
                 pisttitleau:pictitle,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   alert("Error while uploading");
               }else{
                   alert("Successfully uploaded");
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}



this.getdata();


function getdata(){

    firebase.database().ref('blogs/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('post');
      //remove all remaining data in that div
      posts_div.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML= 
          "<div class='card' data-name='"+value.postdanameau+"'>"+
          "<div class='name' style='display:none;'>"+value.postkeyowrdsau+"</div>"+
	      "<div class='card-header animated-bg'>"+
		  "<img title='"+value.posttitleau+"' class='image' src='"+value.imageURL+"' alt='"+value.postaltau+"'></div>"+
	      "<div class='card-content'>"+
          "<div style='color: black;justify-content: space-between'>"+
		  "<h3 class='card-title animated-bg animated-bg-text dmwhite'>"+value.pisttitleau+"</h3></div>"+
          "<div id='"+value.postidau+"' class='counter counter1 postl animated-bg animated-bg-text'>"+
          "<ul>"+
          "<li data-action='like'>"+
          "<span class='icon'><svg width='40' height='40' viewBox='0 0 512 512'><path d='M256,360a16,16,0,0,1-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33.28,27.1-9.31,52.13-29.3,76.5-9.38,11.44-26.4,29.73-65.7,56.41A16,16,0,0,1,256,360Z'/></svg></span>"+
          "<span class='count dmwhite'>wait</span>"+
          "</li>"+
          "</ul>"+
          "</div>"+
		  "<p class='card-excerpt' style='margin-top: 0px;'>"+
		  "<span class='animated-bg animated-bg-text dmwhite'>"+value.postaboutau+"</span>"+
          "<span class='animated-bg animated-bg-text dmwhite'></span>"+
          "</p>"+
		  "<div class='author'>"+
	      "<div class='profile-img animated-bg'>&nbsp;</div>"+
		  "<div class='author-info'>"+
	      "<strong class='animated-bg animated-bg-text publisher dmwhite'  style='color: #026992;'>&nbsp;</strong>"+
		  "<small class='animated-bg animated-bg-text date dmwhite' style='content-visibility: hidden;'>"+value.postdateau+"</small>"+
			"</div></div></div></div>"+posts_div.innerHTML
      ;}

    $(".js-container script").load('auworld/js/after.js');
    });
}

