window.addEventListener("DOMContentLoaded", () => {
    const sideNavItems = document.querySelectorAll("#side-nav > li")
    const topNavItems = document.querySelectorAll("#top-nav > li")
    const saveBtn = document.querySelector("#saveCourier")
    const closeBtn = document.querySelector("#close-modal-btn")
    const modal = document.querySelector("#modal-overlay")
    const carets = document.querySelectorAll(".td .fa.fa-caret-down")

    carets.forEach(caret => {
        const thisCaretMenu = caret.nextElementSibling
        caret.onclick = () => {
            thisCaretMenu.classList.toggle("show")
        } 
    })

    closeBtn.onclick = () => {
        modal.classList.toggle("show")
    }
    saveBtn.onclick = () => {
        modal.classList.toggle("show")
    }
    sideNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            console.log(e.target.classList)
            console.log(this)
            if(event.target.classList.contains("parent")) {
                item.classList.toggle("open")
                sideNavItems.forEach(item => {item.classList.remove('nav-item-active')})
                this.classList.add("nav-item-active")
            }
        })
    })
})