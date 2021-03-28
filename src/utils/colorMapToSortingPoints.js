import { ColorMap, SortingPoints } from "types";

const colorMapToSortingPoints = (colorMap) => {
  const result = {};

  Object.values(colorMap).forEach((point) => {
    result[point] = "red";
  });

  return result;
};

export default colorMapToSortingPoints;
