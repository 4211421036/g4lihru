const speechRecognition =
      window.webkitSpeechRecognition ||
      window.SpeechRecognition;

function startListening() {
  const recog = new speechRecognition();
  recog.start();
  recog.onstart = console.log("silakan bicara");
  
  recog.onresult = handleResults(data){
    handleResults(data);
  }
}

function handleResults(data){
  let text = data.results[0][0].transcript;
  console.log(text);
  text = text.toLowerCase();
  
  if (text.include("ngatuk")){
    console.log("jangan mengatuk");
    window.open("https://music.youtube.com/");
  }
  else if (text.include("macet")){
    console.log("jangan marah,. tetap tenang.... dengarin music ini");
    window.open("https://music.youtube.com/");
  }
}
  
  window.addEventListener("DOMContentLoaded", startListening());
