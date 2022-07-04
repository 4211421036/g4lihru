const song = "recis.-2143340583627970034.mp3";
function RECISNotif() {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
        notify();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                notify();
            }
        });
    }

    function notify() {
        var notification = new Notification('Notifikasi RECIS', {
            icon: 'https://g4lihru.me/345677.png',
            body: 'Terima kasih telah mengikuti perkembangan RECS.\n Terus mewujudkan SDGs 2030 dengan cara menjaga tanaman anda!',
            image: "https://g4lihru.me/ai/recis/recis.-2143340583627970034.gif",
            badge: "https://g4lihru.me/345677.png",
            vibrate: [200, 100, 200],
            tag: "Jaga dan Rawat Tanaman anda!",
        });
        new Audio(song).play();
        notification.onclick = function() {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open("https://g4lihru.me/ai/recis", '_blank');
        };
        setTimeout(notification.close.bind(notification), 7000);
    }

}
RECISNotif();
