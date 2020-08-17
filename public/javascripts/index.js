// For file operations ... START
let currentFolderSelectedToBeDownloadedAsZip = null;

const showFolderContent = (folder) => {
    const currentQuery = window.location.search.split(`=`)[1] ? window.location.search.split(`=`)[1] : ``;
    const filePath = `?path=${currentQuery}/${folder}`;
    window.location.href = filePath;
}

const performFileOperation = (file) => {
    const currentQuery = window.location.search.split(`=`)[1] ? window.location.search.split(`=`)[1] : ``;
    const filePath = `download/?path=${currentQuery}/${file}`;
    window.location.href = filePath;
}

const downloadFolderAsZip = () => {
    let filePath = ``;
    const currentPath = window.location.search.split(`path=`)[1] || ``;
    if (currentPath.length > 0) {
        filePath = `downloadFolderAsZip/?path=${currentPath}/${currentFolderSelectedToBeDownloadedAsZip}`;
    } else {
        filePath = `downloadFolderAsZip/?path=${currentFolderSelectedToBeDownloadedAsZip}`;
    }
    window.location.href = filePath;
}

// For file operations ... END


// For right click menu ... START
const menu = document.querySelector(`.menu`);
let menuVisible = false;
$(`.column .file .folder-area`).on(`contextmenu`, (event) => {
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
    menu.style.display = command === `show` ? `block` : `none`;
    menuVisible = !menuVisible;
};

const setPosition = ({
    top,
    left
}) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu(`show`);
};

window.addEventListener(`click`, e => {
    if (menuVisible) toggleMenu(`hide`);
});
// For right click menu ... END


// For file upload by drag and drop ...
$(`#file-upload-area`).on(`dragenter dragover drop`, async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        const files = event.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i]);
            }
            const fileUploadResult = await fetch(`/upload/files`, { method: `POST`, body: formData });
            console.log(`Success : `, fileUploadResult);
            location.reload();
        }
    } catch (error) {
        console.warn(`Cannot upload file because of this error : >`, error);
    }
});

// For click for the file upload ...
$(`#file-upload-area`).on(`click`, () => {
    $(`#imageUploadInput`).trigger(`click`);
});

$(`#imageUploadInput`).change(async (event) => {
    try {
        const files = event.target.files;
        if (files.length > 0) {
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i]);
            }
            const fileUploadResult = await fetch(`/upload/files`, { method: `POST`, body: formData });
            console.log(`Success : `, fileUploadResult);
            location.reload();
        }
    } catch (error) {
        console.warn(`Error in uploading file : `, error);
    }
});