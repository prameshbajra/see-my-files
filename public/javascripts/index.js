const showFolderContent = (folder) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `?path=${currentQuery}/${folder}`;
    window.location.href = filePath;
}

const performFileOperation = (file) => {
    console.log(file);
}