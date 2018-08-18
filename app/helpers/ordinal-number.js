import { helper } from '@ember/component/helper';

// https://stackoverflow.com/a/13627586
export function ordinalNumber([i, def = '']/*, hash*/) {
  if (typeof i === "number") {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }
  else return def;
}

export default helper(ordinalNumber);
