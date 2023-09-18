function generate_combinations(search_term) {
    var first_asterisk_idx = search_term.indexOf('*');
    
    if (first_asterisk_idx == -1) {
        var first_bar_idx = search_term.indexOf('/');
        if (first_bar_idx == -1) {
            return [search_term];
        }

        var search_term_1 = search_term.split('');
        var search_term_2 = search_term.split('');
    
        search_term_1.splice(first_bar_idx, 1, '_');
        search_term_2.splice(first_bar_idx, 1, '__');
        
        search_term_1 = search_term_1.join('');
        search_term_2 = search_term_2.join('');
    
        return generate_combinations(search_term_1).concat(generate_combinations(search_term_2));
    }

    var combinations = []
    for (var i = 0; i < 10; i++) {
        var search_term_i = search_term.split('');
        search_term_i.splice(first_asterisk_idx, 1, '_'.repeat(i));
        search_term_i = search_term_i.join('');

        combinations = combinations.concat(generate_combinations(search_term_i));
    }

    return combinations;
}

function get_results_simple(search_term) {
    // search_term is a string like 'H_LL'
    // will search the dictionary 'dict' (an array of words) for words that match the pattern 
    // (e.g. 'H_LL' will return 'HALL', 'HELL', 'HILL', etc.)

    search_term = search_term.toLowerCase();

    var results = []
    for (var i = 0; i < dict.length; i++) {
        var word = dict[i];
        var word_plain = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        var match = true;
        if (search_term.length != word_plain.length) continue;
        for (var j = 0; j < search_term.length; j++) {
            if (search_term[j] == '_' || search_term[j] == word_plain[j]) {
                continue;
            }

            match = false;
            break;
        }

        if (match) {
            results.push(word);
        }
    }

    return results;
}

function get_results(search_term) {
    var search_terms = generate_combinations(search_term);
    
    var results = [];
    for (var i = 0; i < search_terms.length; i++) {
        results = results.concat(get_results_simple(search_terms[i]));
    }

    return results;
}