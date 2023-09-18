function display_results() {
    var results_div = document.getElementById('results-container');
    results_div.innerHTML = '';

    var search_term = document.getElementById('search-term').value;
    var results = get_results(search_term);
    
    var output = '';
    for (var i = 0; i < results.length; i++)
        output += results[i] + '<br>';

    if (output == '') {
        output = 'Nada.';
    }

    results_div.innerHTML = output;
    results_div.scrollTop = 0;
}