// 0, 1, 1, 2, 3, 5, 8, 13, 21...
function fibonacci(n) { //
    let n1 = 0; // primeiro número da sequência
    let n2 = 1; //  segundo número da sequência
    let sum = 0; // variável para armazenar a soma dos dois números

    for (let i = 2; i <= n; i++) { // loop para calcular o n-ésimo número da sequência
        sum = n1 + n2; // soma os dois números
        n1 = n2; // o primeiro número agora é o segundo número
        n2 = sum; // o segundo número agora é a soma dos dois números
    }

    return n === 0 ? n1 : n2; // retorna o n-ésimo número da sequência
}

const result = fibonacci(5); // chama a função fibonacci com o valor 5
console.log(result);  // imprime o resultado no console
