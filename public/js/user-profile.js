
const quoteElement = document.getElementById("motivation");

var category = 'inspirational'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'WDZkDxoZTrzW5rJ+jJr2ZQ==YWOAV5C0qrUMSaXf'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        const quote = result[0].quote;
    const author = result[0].author;
    quoteElement.innerHTML = '<p>"' + quote + '"</p><p>- ' + author + '</p>';
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});



