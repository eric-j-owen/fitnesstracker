export { User } from "./user.entity.js";
export { Metric } from "./metric.entity.js";
export { FoodItem } from "./foodItem.entity.js";
export { FoodLog } from "./foodLog.entity.js";

/* 
adding reference to circular dependence fix in case something else breaks
https://github.com/typeorm/typeorm/issues/4526
*/
