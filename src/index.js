function find_bracket_string_rec(object) {
    try {  // блок инструкций
        answer = ""
        if (Object.prototype.toString.call(object).indexOf('Array') > 0) {
        object.forEach(element => {
            answer += find_bracket_string_rec(element)
        });
        return answer
        }
        else {
        return object
        }
    }
    catch{
        console.log("Oops.") // то, что будет выполнено, если произойдет ошибка в try
    }
}
    
function get_paired_bracket(config, bracket) {
    let index = config.indexOf(bracket)
    return index % 2 == 0 ? config[index + 1] : config[index - 1]
}

function check_string_with_config(str, config) {
    let brackets = Array()
    let last_index = -1
    let closing_brackets = ""
    let opened_brackets = ""
    for (let index = 0; index < config.length; index++) {
        const element = config[index];
        if (index % 2 == 0) {
        opened_brackets += element;
        }
        else {
        closing_brackets += element;
        }
    }
    let equal_brackets_count = {}
    let answer = true;
    Array.from(str).forEach(element => {
        if (!answer)
        return;
        if (opened_brackets.indexOf(element) > -1 && closing_brackets.indexOf(element) > -1) {
            if (equal_brackets_count[element] == undefined || equal_brackets_count[element] == 0) {
                equal_brackets_count[element] = 1;
                brackets.push(element);
                last_index++;
            }
            else if (equal_brackets_count[element] == 1) {
                let last_bracket = brackets[last_index];      
                if (last_bracket == element) {
                brackets.pop();
                last_index--;
                equal_brackets_count[element] = 0;
                }
                else {
                answer = false;
                }
            }
        }
        else if (last_index == -1) {
            if (opened_brackets.indexOf(element) == -1) {
                answer = false;
            }
            brackets.push(element);
            last_index++;
        }
        else {
            let last_bracket = brackets[last_index];
            if (opened_brackets.indexOf(last_bracket) > -1) {
                if (opened_brackets.indexOf(element) > -1) {
                    last_index++;
                    brackets.push(element);
                }
                else {
                    if (get_paired_bracket(config, element) == last_bracket) {
                        brackets.pop();
                        last_index--;
                    }
                    else {
                        answer = false;
                    }
                }
            }
            else {
                if (get_paired_bracket(config, element) == last_bracket) {
                    brackets.pop();
                    last_index--;
                }
                else {
                    answer = false;
                }
            }
        }
    });
    for (var key in equal_brackets_count) {
        if (equal_brackets_count[key] % 2 == 1) {
            answer = false;
        }
    }
    return answer && brackets.length == 0;
}
    
module.exports = function check(str, bracketsConfig) {
    return check_string_with_config(str, find_bracket_string_rec(bracketsConfig));
}
