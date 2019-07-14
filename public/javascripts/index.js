const showFileContent = (file) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    const filePath = `?path=${currentQuery}/${file}`;
    window.location.href = filePath;
}