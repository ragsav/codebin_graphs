const bubble_sort = `

algorithm =function* (array) {
  console.log(array)
  for(var i=0;i<array.length;i++){
      for(var j=0;j<array.length-i-1;j++){
          yield {array:[...array],red:[],blue:[],yellow:[j,j+1]}
          if(array[j]>array[j+1]){
              yield {array:[...array],red:[j,j+1],blue:[],yellow:[]}
              var t = array[j];
              array[j]=array[j+1];
              array[j+1]=t;
              yield {array:[...array],red:[],blue:[j,j+1],yellow:[]}
          }
      }
  }
}
`;

export default bubble_sort;
