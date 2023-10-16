var section = document.querySelector(".buttons");
section.addEventListener("click", function(evt){
    let targetItem = evt.target;
    targetItem.classList.add("red");
})