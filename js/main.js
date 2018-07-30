var songs = [];
var currSongID;
var themeSwitchID = 0;
var themeSwitchIDCover;
if (localStorage.getItem('themeSwitchID') != null || localStorage.getItem('themeSwitchID') != undefined) {
    themeSwitchIDCover = parseInt(localStorage.getItem('themeSwitchID'));
} else {
    themeSwitchIDCover = 0;
}
var ppp = new Song("Girls Like You - Maroon 5", embedder("https://www.youtube.com/watch?v=aJOTlE1K90k"), songs.length);
songs.push(ppp);
ppp = new Song("Perfect - Ed Sheeran", embedder("https://www.youtube.com/watch?v=iKzRIweSBLA"), songs.length);
songs.push(ppp);
ppp = new Song("Without You! - Usher", embedder("https://www.youtube.com/watch?v=ZywDWOaQ9GU"), songs.length);
songs.push(ppp);
ppp = new Song("Sad Song - We The Kings", embedder("https://www.youtube.com/watch?v=BZsXcc_tC-o"), songs.length);
songs.push(ppp);
ppp = new Song("Closer - The Chainsmokers", embedder("https://www.youtube.com/watch?v=_bmHvLjsqp8"), songs.length);
songs.push(ppp);


function Song(name, link, id) {
    this.name = name;
    this.link = link;
    this.id = id;
}
function creation(temp) {
    var id = temp.id;
    document.getElementById('list').innerHTML += "<div class=\"listing" + id + " f-box\" onclick=\"{ play(songs[" + id + "]) }\"> <i class=\"fab fa-itunes-note\" ></i ><span class=\"title\">" + temp.name + "</span> <i class=\"song" + id + " fas fa-play-circle\"></i> <span class=\"cross\" onclick=\"deleteSong(" + id + ",event)\">x</span></div >";
    var appearingItem = document.getElementsByClassName('listing' + id)[0];
    appearingItem.style.animationName = 'appear';
    setTimeout(function () {
        appearingItem.style.animationName = 'empty';
    }, 2000);
}
function addSong() {
    var name = document.getElementById("name").value;
    var link = document.getElementById("link").value;
    var regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (link != null && regex.test(link)) {
        var temp = new Song(name, embedder(link), songs.length);
        creation(temp);
        songs.push(temp);
        if (themeSwitchID === 1) {
            forDynamic('backgroundColor', '#191d1e', '0 3px 5px rgba(0, 0, 0, 0.8), 3px 0 5px rgba(0, 0, 0, 0.8)');
        }
        document.getElementById("link").style.borderColor = "#bbb";
        document.getElementById("name").value = null;
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
        text: "Once deleted, you will not be able to recover this video!",
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
            songs[id] = undefined;
            if (currSongID === id) {
                frame.setAttribute('src', 'pages/blank.html');
                console.log(songs);
                var flag = 0;
                for (var i = currSongID; i < songs.length; i++) {
                    if (songs[i] != undefined) {
                        play(songs[i]);
                        break;
                    }
                    if (i === songs.length - 1 && flag === 0) {
                        flag = 1;
                        i = -1;
                    }
                }
            }
        }
    });
}
(function start() {
    for (let i = 0; i < songs.length; i++) {
        creation(songs[i]);
    }
    play(songs[0]);

    themeSwitch(themeSwitchIDCover);
})();
function play(song) {
    if (song != undefined) {
        document.getElementById("myFrame").setAttribute('src', song.link);
        document.getElementById("dwn").setAttribute('href', "https://en.savefrom.net/#url=" + song.link);
        currSongID = song.id;
        document.getElementById('title').innerHTML = "<i class=\"fab fa-itunes-note\"></i> " + song.name;
        setTimeout(function () { markPlaying(song.id) }, 1000);
    }
}
function markPlaying(id) {
    var arr = document.getElementsByClassName('fa-play-circle');
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.display = 'none';
    }
    document.getElementsByClassName('song' + id)[0].style.display = 'inline-block';
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
function savePlaylist() {
    swal({
        title: "Are you sure?",
        text: "Your saved playlist will be overwritten!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            if (checkEmpty(songs)) {
                localStorage.setItem('songs', JSON.stringify(songs));
                swal({
                    text: "Playlist Saved!",
                    icon: "success",
                });
            } else {
                swal({
                    text: "Playlist Is Empty, Please Add Some Videos Before Saving Them!",
                    icon: "error",
                });
            }
        }
    });

}
function checkEmpty(arr) {
    var flag = false;
    console.log(arr);

    if (!(arr === undefined || arr === null)) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element != null || element != undefined) {
                flag = true;
            }
        }
    }
    return flag;
}
function loadPlaylist() {
    swal({
        title: "Are you sure?",
        text: "Your current playlist will be overwritten!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            if (checkEmpty(JSON.parse(localStorage.getItem('songs')))) {
                songs = JSON.parse(localStorage.getItem('songs'));
                document.getElementById('list').innerHTML = "";
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i] != undefined || songs[i] != null) {
                        creation(songs[i]);
                    }
                }
                if (themeSwitchID === 1) {
                    forDynamic('backgroundColor', '#191d1e', '0 3px 5px rgba(0, 0, 0, 0.8), 3px 0 5px rgba(0, 0, 0, 0.8)');
                }
                swal({ text: "Playlist Loaded!", icon: "success", });
                for (var i = 0; i < songs.length; i++) {
                    if (songs[i] != undefined) {
                        play(songs[i]);
                        break;
                    }
                }
            } else {
                swal({
                    text: "Playlist Is Empty, Please Add Some Videos And Save Them!",
                    icon: "error",
                });
            }
        }
    });
}
function styling(name, property, value, shadowVal) {
    document.getElementsByClassName(name)[0].style[property] = value;
    if (shadowVal != undefined) {
        document.getElementsByClassName(name)[0].style.boxShadow = shadowVal;
    }
    if (name === 'f-box') {
        forDynamic(property, value, shadowVal);
    }
}
function themeSwitch(id) {
    arr = ['topFix', 'left', 'rightContainer', 'f-box'];
    if (id === 1 || id === undefined) {
        if (themeSwitchID === 0) {
            shadowVal = '0 3px 5px rgba(0, 0, 0, 0.6), 3px 0 5px rgba(0, 0, 0, 0.6)';
            document.getElementsByTagName('body')[0].style.backgroundColor = '#202626';
            document.getElementsByTagName('body')[0].style.color = '#dedede';
            for (let index = 0; index < arr.length; index++) {
                styling(arr[index], 'backgroundColor', '#191d1e', shadowVal);
            }
            document.getElementById('dot').style.marginLeft = '20px';
            themeSwitchID = 1;

        } else {
            shadowVal = '0 3px 5px rgba(0, 0, 0, 0.3), 3px 0 5px rgba(0, 0, 0, 0.3)';
            document.getElementsByTagName('body')[0].style.backgroundColor = '#dedede';
            document.getElementsByTagName('body')[0].style.color = '#333';
            for (let index = 0; index < arr.length; index++) {
                styling(arr[index], 'backgroundColor', '#fff', shadowVal);
            }
            styling('f-box', 'backgroundColor', '#ddd', shadowVal);
            document.getElementById('dot').style.marginLeft = '0px';
            themeSwitchID = 0;
        }
        localStorage.setItem('themeSwitchID', themeSwitchID);
    } else {
        shadowVal = '0 3px 5px rgba(0, 0, 0, 0.3), 3px 0 5px rgba(0, 0, 0, 0.3)';
        document.getElementsByTagName('body')[0].style.backgroundColor = '#dedede';
        document.getElementsByTagName('body')[0].style.color = '#333';
        for (let index = 0; index < arr.length; index++) {
            styling(arr[index], 'backgroundColor', '#fff', shadowVal);
        }
        styling('f-box', 'backgroundColor', '#ddd', shadowVal);
        document.getElementById('dot').style.marginLeft = '0px';
        themeSwitchID = 0;
    }
}
function forDynamic(property, value, shadowVal) {
    let temp = document.getElementsByClassName('f-box');
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i];
        element.style[property] = value;
        if (shadowVal != undefined) {
            element.style.boxShadow = shadowVal;
        }
    }
}