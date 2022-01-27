const addingNumbers = (numbers, sum) => {
    let result = `No hay números que sumen ${sum}`;
    try{
        //possibles validations of natural numbers
        /*numbers.map(num => {
            if(num < 0) throw "Alguno de los números no es natural";
            if (num % 1 == 0) throw "Alguno de los números no es natural";
        })*/
        numbers.map((num, index) => {
            let expected = sum - num;
            if(numbers.includes(expected) && index!==numbers.indexOf(expected)){
                //throw error to stop iterations
                throw [num, expected];
            }
        })
    }
    catch(err){
        return result = err;
    }
}