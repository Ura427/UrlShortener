document.getElementById("shorten-btn").onclick = ShortenUrlClick;

function ShortenUrlClick(){
    var inputText = document.getElementById("link-input").value;
    console.log(inputText);
    if(inputText !== ""){
        alert("Ok");
    }
}