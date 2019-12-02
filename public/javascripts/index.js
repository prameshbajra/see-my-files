// For file operations ... START
let currentFolderSelectedToBeDownloadedAsZip = null;

const showFolderContent = (folder) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `?path=${currentQuery}/${folder}`;
    window.location.href = filePath;
}

const performFileOperation = (file) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `download/?path=${currentQuery}/${file}`;
    window.location.href = filePath;
}

const downloadFolderAsZip = () => {
    let filePath = "";
    const currentPath = window.location.search.split("path=")[1] || "";
    if (currentPath.length > 0) {
        filePath = `downloadFolderAsZip/?path=${currentPath}/${currentFolderSelectedToBeDownloadedAsZip}`;
    } else {
        filePath = `downloadFolderAsZip/?path=${currentFolderSelectedToBeDownloadedAsZip}`;
    }
    window.location.href = filePath;
}

// For file operations ... END


// For right click menu ... START
const menu = document.querySelector(".menu");
let menuVisible = false;
$(".column .file .folder-area").on("contextmenu", (event) => {
    event.preventDefault();
    const origin = {
        left: event.pageX,
        top: event.pageY
    };
    currentFolderSelectedToBeDownloadedAsZip = event.currentTarget.textContent.trim();
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

// For right click menu ... END