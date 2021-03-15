let LENGTH=0;
let i = ytLink.search('playlist?');
let playlistID = ytLink.slice(i+14)

//duration is of the form PT11M22S i.e 11min22sec
function extractLength(str){
    console.log("this is extract length ")
    let m = str.search('M');
    let s = str.search('S')
    let min = parseInt(str.slice(2,m));
    let sec = parseInt(str.slice(m+1,s));
    return (min*60)+sec;
}

function calculateLength(data){
    console.log("this is calculate length ")
    for(let i of data.items){
        let item = i.contentDetails.duration;
        LENGTH += extractLength(item)
    }
}
function fetchVideos(videoID){
    console.log("this is fetch videos ")
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        var response = JSON.parse(xhrRequest.response);
        calculateLength(response);
    }
    xhrRequest.open('get',`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoID}&key=AIzaSyCPOzYkvB9zqXIbfzwpwuIctgvbxqTeviE`,true)
    xhrRequest.send();
}

function iterateVideos(data){
    
    for(let i of data.items){
        let item = i.snippet.resourceId.videoId;
        // $('ul').append(`<li>${item}</li>`)
        fetchVideos(item);
    }
}

function fetchYtplaylist(){
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        var response = JSON.parse(xhrRequest.response);
        iterateVideos(response);
    }
    xhrRequest.open('get',`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=${playlistID}&key=AIzaSyCPOzYkvB9zqXIbfzwpwuIctgvbxqTeviE`,true)
    xhrRequest.send();
}

fetchYtplaylist();

setTimeout(function(){
    var hours = Math.floor(LENGTH / 60 / 60);
    var minutes = Math.floor(LENGTH / 60) - (hours * 60);
    var seconds = LENGTH % 60;
    $('.main-body').append(`<p>Length of the Playlist is ${hours} Hours, ${minutes} minutes, ${seconds} seconds</p>`)    
},1000)

// $.ajax({
//     url:'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=PLdnsORcN_8yi1iEPXagU0acwtChNQShFe&key=AIzaSyCPOzYkvB9zqXIbfzwpwuIctgvbxqTeviE',
//     method:'GET',
//     success:displayName
// })