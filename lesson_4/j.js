const POSSIBLE_WINNING_ROWS = [
    [ "1", "", "3" ],
    // [ "", "5", "" ],
    // [ "", "", "" ],
    // [ "1", "", "" ],
    // [ "", "5", "" ],
    // [ "3", "", "" ],
    // [ "1", "", "" ],
    // [ "3", "", "" ],
  ];

let last;
POSSIBLE_WINNING_ROWS.forEach(row => {
  let index = row.findIndex(key => key === "");
  last = row[index];
});

console.log(last);

// console.log(POSSIBLE_WINNING_ROWS.filter(row => row.includes("")).length)
