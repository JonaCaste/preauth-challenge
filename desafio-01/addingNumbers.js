const addingNumbers = (numbers, sum) => {
    let result = `No hay números que sumen ${sum}`;
    try{
        //possibles validations of natural numbers
        /*numbers.map(num => {
            if(num < 0) throw "Alguno de los números no es natural";
            if (num % 1 == 0) throw "Alguno de los números no es natural";
        })*/
        numbers.map(num => {
            let expected = sum - num;
            let numbersFilter = numbers.filter(el =>  el !== num);
            numbersFilter.map( () => {
                if(numbersFilter.includes(expected)){
                    //throw error to stop iterations
                    throw [num, expected];
                }
            })
        })
    }
    catch(err){
        return result = err;
    }
}