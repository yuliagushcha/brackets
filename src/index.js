module.exports = function check(str, bracketsConfig) {
    let brackets = str.split('');
    let arr = [];
    let openBracket = ['{', '(', '[', '|', '1', '3', '5', '7', '8']; // задаем открывающие скобки
    let closeBracket = ['}', ')', ']', '|', '2', '4', '6', '7', '8']; // задаем закрывающие скобки
    let openBracketIndex;
    let closeBracketIndex;

    for (let i = 0, len = brackets.length; i < len; i++) {  // проверяем каждую скобку
       openBracketIndex = openBracket.indexOf(brackets[i]);
       if (openBracketIndex !== -1) { // находим открывающую скобку
           arr.push(openBracketIndex); // помещаем ее в массив
           continue;
       }
       console.log(arr);

       closeBracketIndex = closeBracket.indexOf(brackets[i]);
       if (closeBracketIndex !== -1) { // находим закрывающую скобку
           openBracketIndex = arr.pop(); // так как для нее пару нашли, удаляем ее из массива
           if (closeBracketIndex !== openBracketIndex)
            {
               return false;
           }
       }
    }

    if (arr.length !== 0) {  // делаем проверку на оставшиеся в строке скобки
        return false;
    }

    return true;
}
