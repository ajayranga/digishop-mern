const printPrime = (num) => {
   const arr = new Array(num).fill(true);
   for (i = 2; i <= Math.sqrt(num); i++) {
      if (arr[i] === true) {
         for (var j = i * i; j <= num; j += i) arr[j] = false;
      }
   }
   for (var i = 2; i < num; i++) {
      arr[i] === true && console.log(i);
   }
};
printPrime(1000);
