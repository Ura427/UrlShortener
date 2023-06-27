
//Button onclick event
$("#shorten-btn").click(function() {
    var inputText = $("#link-input").val();
    console.log(inputText);
    if (inputText !== "") {
        alert("Ok");
    }
});
