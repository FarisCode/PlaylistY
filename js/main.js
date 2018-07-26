var songs = [];

var ppp = new Song("Perfect", "Ed Sheeran", embedder("https://www.youtube.com/watch?v=SvvXsyFI3b8"));
songs.push(ppp);
ppp = new Song("Without You!", "Usher", embedder("https://www.youtube.com/watch?v=ZywDWOaQ9GU"));
songs.push(ppp);

function Song(name, artist, link) {
    this.name = name;
    this.link = link;
    this.artist = artist;
}
function creation(temp,id) {
        document.getElementById('list').innerHTML += "<div class=\"listing" + id + " f-box\" onclick=\"{ play(songs[" + id + "]) }\"> <i class=\"fab fa-itunes-note\" ></i ><span class=\"title\">" + temp.name + "</span> - <span class=\"artist\">" + temp.artist + "</span><span class=\"cross\" onclick=\"deleteSong(" + id + ")\">x</span></div >";
        var appearingItem=document.getElementsByClassName('listing' + id)[0];
        appearingItem.style.animationName = 'appear';
        setTimeout(function(){
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
        creation(temp,songs.length);
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
        ele.style.animationName="disappear";
        setTimeout(function(){
            ele.remove();
        },1500);
        if (songs[id].link === frame.getAttribute('src')) {
            frame.setAttribute('src', 'pages/blank.html');
        }
        songs[id] = undefined;
    }
}

(function start() {
    for (let i = 0; i < songs.length; i++) {
        creation(songs[i],i);
    }
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