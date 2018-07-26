var songs = [];
var ppp = new Song("Perfect", "Ed Sheeran", embedder("https://www.youtube.com/watch?v=SvvXsyFI3b8"),songs.length);
songs.push(ppp);
ppp = new Song("Without You!", "Usher", embedder("https://www.youtube.com/watch?v=ZywDWOaQ9GU"),songs.length);
songs.push(ppp);
ppp = new Song("Closer", "The Chainsmokers", embedder("https://www.youtube.com/watch?v=_bmHvLjsqp8"),songs.length);
songs.push(ppp);
ppp = new Song("Girls Like You", "Maroon 5", embedder("https://www.youtube.com/watch?v=aJOTlE1K90k"),songs.length);
songs.push(ppp);

function Song(name, artist, link, id) {
    this.name = name;
    this.link = link;
    this.artist = artist;
    this.id=id;
}
function creation(temp, id) {
    document.getElementById('list').innerHTML += "<div class=\"listing" + id + " f-box\" onclick=\"{ play(songs[" + id + "]) }\"> <i class=\"fab fa-itunes-note\" ></i ><span class=\"title\">" + temp.name + "</span> - <span class=\"artist\">" + temp.artist + "</span> <i class=\"song"+id+" fas fa-play-circle\"></i> <span class=\"cross\" onclick=\"deleteSong(" + id + ",event)\">x</span></div >";
    var appearingItem = document.getElementsByClassName('listing' + id)[0];
    appearingItem.style.animationName = 'appear';
    setTimeout(function () {
        appearingItem.style.animationName = 'empty';
    }, 2000);
}
function addSong() {
    var name = document.getElementById("name").value;
    var artist = document.getElementById("artist").value;
    var link = document.getElementById("link").value;
    var regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (link != null && regex.test(link)) {
        var temp = new Song(name, artist, embedder(link));
        creation(temp, songs.length);
        songs.push(temp);
        document.getElementById("link").style.borderColor = "#bbb";
        document.getElementById("name").value = null;
        document.getElementById("artist").value = null;
        document.getElementById("link").value = null;
    } else {
        console.log("Invalid YT Link!..");
        document.getElementById("link").style.borderColor = "red";
    }
}
function deleteSong(id, event) {
    event.stopPropagation();
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Video!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var frame = document.getElementById("myFrame");
            var ele = document.getElementsByClassName("listing" + id)[0];
            ele.style.animationName = "disappear";
            setTimeout(function () {
                ele.remove();
            }, 1500);
            var temp=songs[id].link;
            songs[id] = undefined;
            if (temp === frame.getAttribute('src')) {
                frame.setAttribute('src', 'pages/blank.html');
                console.log(songs);
                for (var i=0;i<songs.length;i++) {
                    if (songs[i]!=undefined) {
                        play(songs[i]);
                        break;
                    }
                }
            }
        }
    });
}
(function start() {
    for (let i = 0; i < songs.length; i++) {
        creation(songs[i], i);
    }
    play(songs[0]);
})();
function play(song) {
    if (song != undefined) {
        document.getElementById("myFrame").setAttribute('src', song.link);
    }
}
function markPlaying(id){
    var arr=document.getElementsByClassName('fa-play-circle');
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.display='none';
    }
    document.getElementsByClassName('song'+id)[0].style.display='inline-block';
}
function embedder(link) {
    var prev = ' ';
    var flag = false;
    var str = "https://www.youtube.com/embed/";
    var vidCode = "";
    var element;
    for (i = 0; i < link.length; i++) {
        element = link[i];
        if (element === '&') {
            flag = false;
        }
        if (flag) {
            vidCode += element;
        }
        if (prev === 'v' && element === '=') {
            flag = true;
        }

        prev = element;
    }
    return str + vidCode + "?autoplay=1";
}
