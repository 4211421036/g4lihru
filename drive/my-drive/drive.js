function upload() {
    //get your image
    var image = document.getElementById('image').files[0];
    //get your blog text
    var post = document.getElementById('post').value;
    //get image name
    var imageName = image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef = firebase.storage().ref('images/' + imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask = storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed', function(snapshot) {
        //get task progress by following code
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function(error) {
        //handle error here
        console.log(error.message);
    }, function() {
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //get your image download url here and upload it to databse
            //our path where data is stored ...push is used so that every post have unique id
            firebase.database().ref('blogs/').push().set({
                text: post,
                imageURL: downloadURL
            }, function(error) {
                if (error) {
                    alert("Error while uploading");
                } else {
                    alert("Successfully uploaded");
                    //now reset your form
                    document.getElementById('post-form').reset();
                    getdata();
                }
            });
        });
    });

}

window.onload = function() {
    this.getdata();
}


function getdata() {
    firebase.database().ref('blogs/').once('value').then(function(snapshot) {
        //get your posts div
        var posts_div = document.getElementById('posts');
        //remove all remaining data in that div
        posts.innerHTML = "";
        //get data from firebase
        var data = snapshot.val();
        console.log(data);
        //now pass this data to our posts div
        //we have to pass our data to for loop to get one by one
        //we are passing the key of that post to delete it from database
        for (let [key, value] of Object.entries(data)) {
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'><hr>" +
                "<div class='card'>" +
                "<img src='" + value.imageURL + "' style='height:250px;'>" +
                "<img class='circular--square' style='border-top-left-radius: 50% 50%; border-top-right-radius: 50% 50%; border-bottom-right-radius: 50% 50%; border-bottom-left-radius: 50% 50%; float:right; height:4.6875rem; position:relative; margin-top:-3.09375rem; width:4.6875rem;' aria-hidden='true' src='//g4lihru.me/345677.png'>" +
                "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
                "<button class='btn btn-danger' id='" + key + "' onclick='delete_post(this.id)'>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                "</div></div></div>" + posts_div.innerHTML;
        }

    });
}

function delete_post(key) {
    firebase.database().ref('blogs/' + key).remove();
    getdata();

}
