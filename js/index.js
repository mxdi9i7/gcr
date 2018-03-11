
const saveSearchQueryToCookie = (query, zip) => {
    window.sessionStorage.setItem('query', query)
    window.sessionStorage.setItem('zip', zip)
    window.location.href = "report.html"
}


const handleSearch = () => {
    const query = $('#searchQuery').val()
    const zip = $('#searchZipcode').val()
    saveSearchQueryToCookie(query, zip)
}

$('#searchBtn').click((e) => {
    e.preventDefault();
    const query = $('#searchQuery').val()
    const zip = $('#searchZipcode').val()
    saveSearchQueryToCookie(query, zip)
})



