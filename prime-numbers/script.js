function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

function getPrimesInRange(start, end) {
  const result = [];
  // const nonPrimes = [];

  const startTime = performance.now();

  for (let num = start; num <= end; num++) {
    const isNumPrime = isPrime(num);
    const timeTaken = performance.now() - startTime;

    // if (isNumPrime) {
      result.push({ number: num, result: isNumPrime ? 'Prime' : 'Normal', time: timeTaken });
    // } else {
    //   nonPrimes.push({ number: num, result: 'Normal', time: timeTaken });
    // }
  }

  const endTime = performance.now();
  const totalElapsedTime = endTime - startTime;

  return { result, totalElapsedTime };
}

document.addEventListener('DOMContentLoaded', () => {
  checkButton.addEventListener('click', () => {
    const checkButton = document.getElementById('checkButton');
    const timeContainer = document.getElementById('time');
    const resultTable = document.getElementById('result');

    resultTable.innerHTML = ``;

    const startRange = parseInt(document.getElementById('start').value);
    const endRange = parseInt(document.getElementById('end').value);

    const { result, totalElapsedTime } = getPrimesInRange(startRange, endRange);

    timeContainer.innerHTML = `Total time taken: ${totalElapsedTime} ms`;
 
    const header = createHeader();
    resultTable.appendChild(header);
    
    result.forEach(num => {
      const row = createTableRow(num);
      resultTable.appendChild(row);
    });

    // nonPrimes.forEach(nonPrime => {
    //   const row = createTableRow(nonPrime);
    //   nonPrimesDiv.appendChild(row);
    // });

    // alert(`Total time taken: ${totalElapsedTime} ms`);
  });
});

function createTableRow(data) {
  const row = document.createElement('tr');

  const numberCell = document.createElement('td');
  numberCell.textContent = data.number;
  row.appendChild(numberCell);

  const resultCell = document.createElement('td');
  resultCell.textContent = data.result;
  row.appendChild(resultCell);

  const timeCell = document.createElement('td');
  timeCell.textContent = `${data.time} ms`;
  row.appendChild(timeCell);

  return row;
}


function createHeader () {
  const tableHeader = document.createElement('tr');
  const numberHeader = document.createElement('th');
  numberHeader.textContent = 'Number';
  tableHeader.appendChild(numberHeader);

  const resultHeader = document.createElement('th');
  resultHeader.textContent = 'Result';
  tableHeader.appendChild(resultHeader);

  const timeHeader = document.createElement('th');
  timeHeader.textContent = 'Time';
  tableHeader.appendChild(timeHeader);

  return tableHeader;
}