const id = 'X1-ZWz1g884odtszv_8clop';
const key = 'AIzaSyC5pB38DhDdodsM5Nk-Sn-et1yH8ueEsFo'

const street = window.sessionStorage.getItem('query')
const zip = window.sessionStorage.getItem('zip')

$.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${id}&address=${street}&citystatezip=${zip}`, (data) => {
    
    console.log(data)
    const status = data.getElementsByTagName('code')[0].innerHTML;
    if (status == 0) {
        const responseObject = data.getElementsByTagName('result')[0]
        console.log(responseObject)
        const streetObject = responseObject.childNodes[2]
        const streetAddress = streetObject.childNodes[0].firstChild.nodeValue;
        const zipcode = streetObject.childNodes[1].firstChild.nodeValue;
        const city = streetObject.childNodes[2].firstChild.nodeValue;
        const state = streetObject.childNodes[3].firstChild.nodeValue;
        const lat = streetObject.childNodes[4].firstChild.nodeValue;
        const long = streetObject.childNodes[5].firstChild.nodeValue;
        const yearBuilt = responseObject.getElementsByTagName('yearBuilt')[0].innerHTML;
        const lotSize = responseObject.getElementsByTagName('lotSizeSqFt') ? responseObject.getElementsByTagName('lotSizeSqFt')[0] : "N/A";
        const bedroom = responseObject.getElementsByTagName('bedrooms')[0].innerHTML;
        const bathroom = responseObject.getElementsByTagName('bathrooms')[0].innerHTML;
        console.log(lotSize)
    
        $('#basicAddress').html(`${streetAddress}, ${city}, ${state} ${zipcode}`)
        $('#basicOthersInfo').html(`
            Estimate based on <br>
                Built in ${yearBuilt}, 
                ${parseInt(bedroom)} beds,
                ${parseInt(bathroom)} baths,
                ${lotSize} sq. ft.
            `)
    
        function initMap() {
            var uluru = {lat: parseFloat(lat), lng: parseFloat(long)};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
            }
    
        initMap()
    } else {
        $('.valuationInfoContainer').html(`
            <div class="valuationHeader retry">
                <h1>Sorry, we could not find a property matching your query, please try with a different address. </h1>
                <div class="input-group">
                    <input type="text" class="form-control rounded-0 form-control-md" placeholder="Enter your street address" id="searchQuery">
                    <input type="number" class="form-control rounded-0 form-control-md" placeholder="Zipcode" id="searchZipcode">
                    <span class="input-group-btn">
                        <button class="btn btn-md u-btn-primary rounded-0" type="button" id="searchBtn" onClick="handleSearch()">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        `)
    }
   
})

$('#restart').click((e) => {
    e.preventDefault();
    $('#searchQuery').focus()
})
