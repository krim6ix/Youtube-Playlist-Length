let LENGTH=0;
let i = ytLink.search('playlist?');
let playlistID = ytLink.slice(i+14)

//duration is of the form PT11M22S i.e 11min22sec
function extractLength(str){
    let m = str.search('M');
    let s = str.search('S')
    let min = parseInt(str.slice(2,m));
    let sec = parseInt(str.slice(m+1,s));
    return (min*60)+sec;
}

function calculateLength(data){
    let len;
    for(let i of data.items){
        let item = i.contentDetails.duration;
        LENGTH += extractLength(item)
        $('ol').append(`<li>${LENGTH}</li>`)
    }
}
function fetchVideos(videoID){
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
        // $('ol').append(`<li>${item}</li>`)
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

// $.ajax({
//     url:'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=PLdnsORcN_8yi1iEPXagU0acwtChNQShFe&key=AIzaSyCPOzYkvB9zqXIbfzwpwuIctgvbxqTeviE',
//     method:'GET',
//     success:displayName
// })