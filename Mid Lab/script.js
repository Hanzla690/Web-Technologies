$("img").mouseover((event)=>{
    let path = $(event.target).attr('src')
    $("#first-item").text(path.split("/")[1])
})

$("img").mouseleave(()=>{
    $("#first-item").text("Politics")
})

