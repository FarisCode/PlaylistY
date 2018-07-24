
var songs = [];
var ppp = new Song("Perfect", "Ed Sheeran", "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1");
songs.push(ppp);

function Song(name, artist, link) {
    this.name = name;
    this.link = link;
    this.artist = artist;
}
function addSong() {
    var name = document.getElementById("name").value;
    var artist = document.getElementById("artist").value;
    var link = document.getElementById("link").value;
    var regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (link != null && regex.test(link)) {
        var temp = new Song(name, artist, embedder(link));
        document.getElementById('list').innerHTML += "<div class=\"listing" + songs.length + " f-box\" onclick=\"{ play(songs[" + songs.length + "]) }\"> <i class=\"fab fa-itunes-note\" ></i ><span class=\"title\">" + temp.name + "</span> - <span class=\"artist\">" + temp.artist + "</span><span class=\"cross\" onclick=\"deleteSong(" + songs.length + ")\">x</span></div >"
        document.getElementsByClassName('listing' + songs.length)[0].style.animationName = 'appear';
        setTimeout(function () {
            document.getElementsByClassName('listing' + songs.length)[0].style.animationName = 'empty';
        }, 2000);
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
function deleteSong(id) {
    if (confirm("Are you sure you want to delete it from your playlist?")) {
        var frame = document.getElementById("myFrame");
        var ele = document.getElementsByClassName("listing" + id)[0];
        ele.remove();
        if (songs[id].link === frame.getAttribute('src')) {
            frame.setAttribute('src', 'pages/blank.html');
        }
        songs[id] = undefined;
    }
}

(function start() {
    play(songs[0]);
})();

function play(song) {
    if (song != undefined) {
        document.getElementById("myFrame").setAttribute('src', song.link);
    }
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