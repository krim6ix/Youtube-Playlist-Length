let LENGTH=0;
let i = ytLink.search('playlist?');
let playlistID = ytLink.slice(i+14)
let linkList = [];

function iterateVideos(data){
    for(let i of data.items){
        let item = i.snippet.resourceId.videoId;
        linkList.push(item);
    }

    //if data.nextPageToken is defined then there are more videos on the next page so fetch that page data also 
    if(data.nextPageToken){
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = function(){
            var response = JSON.parse(xhrRequest.response);
            iterateVideos(response);
        }
        xhrRequest.open('get',`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&pageToken=${data.nextPageToken}&playlistId=${playlistID}&key=AIzaSyCMEUtFkCZtqJNNTFylBthfQs6WpVl8L-Y`,true)
        xhrRequest.send();
    }
}

function fetchYtplaylist(){
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        var response = JSON.parse(xhrRequest.response);
        iterateVideos(response);
    }
    xhrRequest.open('get',`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=${playlistID}&key=AIzaSyCMEUtFkCZtqJNNTFylBthfQs6WpVl8L-Y`,true)
    xhrRequest.send();
}

fetchYtplaylist();

// duration is of the form PT11M22S i.e 11min22sec
parseISO8601Duration = function (iso8601Duration) {
    var iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;

    var matches = iso8601Duration.match(iso8601DurationRegex);
    var days = parseInt(matches[5] === undefined ? 0 : matches[5]);
    var hours = parseInt(matches[6] === undefined ? 0 : matches[6]);
    var minutes = parseInt(matches[7] === undefined ? 0 : matches[7]);
    var seconds = parseInt(matches[8] === undefined ? 0 : matches[8]);
    return days*86400 + hours * 3600 + minutes * 60 + seconds;
}
    


function calculateLength(data){
    for(let i of data.items){
        let item = i.contentDetails.duration;
        var temp=0;
        temp += parseISO8601Duration(item)
        LENGTH+=temp;
        //debugging
        // var hours = Math.floor(LENGTH / 60 / 60);
        // var minutes = Math.floor(LENGTH / 60) - (hours * 60);
        // var seconds = LENGTH % 60;
        // var hours1 = Math.floor(temp / 60 / 60);
        // var minutes1 = Math.floor(temp / 60) - (hours1 * 60);
        // var seconds1 = temp % 60;
        // $('.main-body').append(`<p>Length of the Playlist is ${hours} Hours, ${minutes} minutes, ${seconds} seconds....... ${hours1} Hours, ${minutes1} minutes, ${seconds1} seconds</p>`)

    }
}
function fetchVideos(videoID){
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        var response = JSON.parse(xhrRequest.response);
        calculateLength(response);
    }
    xhrRequest.open('get',`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoID}&key=AIzaSyCMEUtFkCZtqJNNTFylBthfQs6WpVl8L-Y`,true)
    xhrRequest.send();
}

setTimeout(() => {
    console.log(linkList)
    for(let i of linkList){
        fetchVideos(i);
    }
}, 1500);


setTimeout(function(){
    var hours = Math.floor(LENGTH / 60 / 60);
    var minutes = Math.floor(LENGTH / 60) - (hours * 60);
    var seconds = LENGTH % 60;
    $('.main-body').append(`<p>Total Number of Vidoes ${linkList.length}</p>`)    
    $('.main-body').append(`<p>Length of the Playlist is ${hours} Hours, ${minutes} minutes, ${seconds} seconds</p>`)
    
},3000)








// setTimeout(function(){
//     console.log(linkList)
// },1000)

// 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=CGQQAQ&playlistId=PL64Td87Z2s0fC0GqdmN4xiGP_kkum9y-R&key=[YOUR_API_KEY]' \




//api keys
//AIzaSyBXA4xoznOYRpzu4QJ5UJoftPPnSdMfsro
//AIzaSyCPOzYkvB9zqXIbfzwpwuIctgvbxqTeviE
//AIzaSyCMEUtFkCZtqJNNTFylBthfQs6WpVl8L-Y