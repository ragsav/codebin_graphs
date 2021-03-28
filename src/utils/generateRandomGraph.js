export default function generateRandomGraph(n) {
  var adjList = Array(n);
  var nodes = [];
  var links = [];
  var map = {};
  for (var i = 0; i < n; i++) {
    nodes.push({ id: i });
    var array = Array.from(Array(n).keys());
    const shuffled = array.sort(() => 0.5 - Math.random());
    var neighbours = Math.floor((Math.random() * n) / 2);
    var ngh = [];
    for (var m = 0; m < neighbours; m++) {
      if (
        shuffled[m] !== i &&
        map[i] !== shuffled[m] &&
        map[shuffled[m]] !== i
      ) {
        ngh.push(shuffled[m]);
        map[i] = shuffled[m];
      }
    }

    adjList[i] = [...ngh];
    adjList[i].forEach((val, index) => {
      links.push({ source: i, target: val });
    });
  }

  return adjList;
}
