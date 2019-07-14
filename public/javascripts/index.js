const showFileContent = (file) => {
    const currentQuery = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : ``;
    console.log(`?path=${currentQuery}/${file}`);
    const filePath = `?path=${currentQuery}/${file}`;
    window.location.href = filePath;
}