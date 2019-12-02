const showFolderContent = (folder) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `?path=${currentQuery}/${folder}`;
    window.location.href = filePath;
}

const performFileOperation = (file) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `download/?path=${currentQuery}/${file}`;
    console.log(`${filePath}`);
    window.location.href = filePath;
}


// For right click menu ...
const menu = document.querySelector(".menu");
let menuVisible = false;
$(".column .file").on("contextmenu", (event) => {
    event.preventDefault();
    const origin = {
        left: event.pageX,
        top: event.pageY
    };
    setPosition(origin);
    return false;
})

const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
};

const setPosition = ({
    top,
    left
}) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
};

window.addEventListener("click", e => {
    if (menuVisible) toggleMenu("hide");
});