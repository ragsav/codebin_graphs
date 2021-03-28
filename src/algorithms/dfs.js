const dfs = `
function* dfs_rec(adjList, v, vis,path) {
  vis[v] = true;
  path.push(v)
  yield {currentNode:v,vis:[...vis],path:[...path]};
  console.log(v)
  for (var i = 0; i <adjList[v].length; i++) {
    if (!vis[adjList[v][i]]) {
      yield* dfs_rec(adjList, adjList[v][i], vis,path);
    }
  }
}
algorithm =function* (adjList) {
  console.log(adjList)
  var vis = Array(adjList.length).fill(false);
  var path=[];
  for (var i = 0; i < adjList.length; i++) {
    if(!vis[i]){

      yield* dfs_rec(adjList, i, vis,path);
    }
    
  }
}
`;

export default dfs;
