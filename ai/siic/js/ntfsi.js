function SIICNotif() {
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
        var notification = new Notification('Notifikasi SIIC', {
            icon: 'https://g4lihru.me/ai/siic/data/siic.logos.192.png',
            body: 'Perkembangan! Jalanan yang akan dilalui anda diprediksi macet.\nAnda bisa beralih ke transportasi umum!',
            image: "https://g4lihru.me/ai/siic/data/fjkfifkd.jpeg",
            badge: "https://g4lihru.me/ai/siic/data/siic.logos.192.png",
            vibrate: [200, 100, 200],
            tag: "Transportasi Umum, Murah dan Nyaman!",
        });
        notification.onclick = function() {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open("https://g4lihru.me/ai/siic", '_blank');
        };
        setTimeout(notification.close.bind(notification), 7000);
    }

}
SIICNotif();
