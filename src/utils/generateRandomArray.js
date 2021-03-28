export default function generateRandomGraph(n) {
  var array = Array(n);

  for (var i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * 100);
  }

  return array;
}
