const rates = {}; // Objeto para armazenar as taxas de câmbio entre moedas

function setExchangeRate(rate, sourceCurrency, targetCurrency) { // Define a taxa de câmbio entre duas moedas
   
    if (rates[sourceCurrency] === undefined) { // Se a moeda de origem não existir, inicializa-a
        rates[sourceCurrency] = {}; // Inicializa a moeda de origem
    }

    if (rates[targetCurrency] === undefined) { // Se a moeda de destino não existir, inicializa-a
        rates[targetCurrency] = {}; // Inicializa a moeda de destino
    }

    rates[sourceCurrency][targetCurrency] = rate; // Define a taxa de câmbio da moeda de origem para a moeda de destino
    rates[targetCurrency][sourceCurrency] = 1 / rate; // Define a taxa de câmbio da moeda de destino para a moeda de origem (inversa)

    for (const currency in rates) { // Para cada moeda já existente no objeto rates
        if (currency !== sourceCurrency && currency !== targetCurrency) { // Ignora a moeda de origem e a moeda de destino

            if (rates[currency][sourceCurrency] !== undefined) { // Se a moeda de origem já tiver uma taxa de câmbio definida
                const pivotRate = rates[currency][sourceCurrency]; // Taxa intermediária
                rates[currency][targetCurrency] = rate * pivotRate; // Define a taxa de câmbio da moeda intermediária para a moeda de destino
                rates[targetCurrency][currency] = 1 / (rate * pivotRate); // Define a taxa de câmbio da moeda de destino para a moeda intermediária (inversa)
            }
        }
    }
}

function convertToCurrency(value, sourceCurrency, targetCurrency) { // Converte um valor de uma moeda para outra usando a taxa de câmbio definida
    const exchangeRate = rates[sourceCurrency] && rates[sourceCurrency][targetCurrency]; // Obtém a taxa de câmbio da moeda de origem para a moeda de destino
    return exchangeRate !== undefined ? value * exchangeRate : undefined; // Se a taxa de câmbio for válida, retorna o valor convertido, caso contrário, retorna undefined
}

function formatValueForDisplay(value) { // Formata o valor para exibição com duas casas decimais
    return value.toFixed(2); // Retorna o valor formatado com duas casas decimais
}

function printForeignValues(value, sourceCurrency) { // Imprime os valores convertidos de uma moeda para outras moedas disponíveis no objeto rates
    console.info(`The value of ${value} ${sourceCurrency} is:`); // Exibe o valor original com a moeda de origem

    for (const targetCurrency in rates) { // Para cada moeda disponível no objeto rates
        if (targetCurrency !== sourceCurrency) { // Ignora a moeda de origem
          
            const convertedValue  = convertToCurrency(value, sourceCurrency, targetCurrency); // Converte o valor da moeda de origem para a moeda de destino
            if (convertedValue !== undefined) { // Se a conversão for válida
                const displayValue = formatValueForDisplay(convertedValue); // Formata o valor convertido para exibição
                console.info(`- ${displayValue} ${targetCurrency}`); // Exibe o valor convertido com a moeda de destino
            }
        }
    }
}

setExchangeRate(0.88, 'USD', 'EUR'); // Define a taxa de câmbio de USD para EUR
setExchangeRate(107.4, 'USD', 'JPY'); // Define a taxa de câmbio de USD para JPY
printForeignValues(10, 'EUR'); // Imprime os valores convertidos de 10 EUR para outras moedas disponíveis no objeto rates