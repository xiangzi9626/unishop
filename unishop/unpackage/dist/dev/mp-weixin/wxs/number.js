"use strict";
function parsePrice(val) {
  if (!val) {
    val = 0;
  }
  return val.toFixed(2).split(".");
}
exports.parsePrice = parsePrice;
