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