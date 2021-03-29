const algorithmNameToHeading = (s) => {
  var stringArray = s.split("_");

  var result = "";
  stringArray.forEach((name) => {
    result += name.charAt(0).toUpperCase() + name.slice(1) + " ";
  });

  return result;
};

export default algorithmNameToHeading;
