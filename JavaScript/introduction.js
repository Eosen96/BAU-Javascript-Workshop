// run `node index.js` in the terminal

const username = "Cem";
let age = 18;
let message = "Hello Worlds";
let isHappy = true; //isHappy, adminRights, secondUser, activeVersions isPersonHappy... camelCase

console.log(username, age, message, isHappy);

age = 12;

console.log(username, age);
console.log(typeof username); // Type Of Variable

//String

let startingString = "My name is";
let nameString = "Bahcesehir!";
let str3 = `${startingString} not ${nameString}`; // template literal

const isGreater = 1 > 3;

console.log(`String: ${str3}`);
console.log(`Boolean: ${isGreater}`);

const calculateGpaWith3Course = (course1, course2, course3) => {
  // arrow function must be defined before using
  return (course1 + course2 + course3) / 3;
};

function calculateResult(myGpa) {
  if (myGpa < 2 || myGpa > 4) {
    console.log("NOT POSSIBLE!!!");
    return;
  }
  if (myGpa < 2.0) console.log("You're failed!");
  // single line ifs do not need {} (not mandatory)
  else if (myGpa >= 2 && myGpa < 3) console.log("Good Enough!");
  else if (myGpa >= 3 && myGpa < 4) console.log("Perfect!");
  else if (myGpa === "4") console.log("WoW!");
}

const myGpa = calculateGpaWith3Course(4, 2, 1.3);
calculateResult(myGpa);

let courses = [4, 2, 1.3];
courses = courses.map((course) => course * 25); // all array operations https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
console.log("Courses", courses);
const myFinalGpa = calculateGpa(courses);
console.log(myFinalGpa.toFixed(3)); // 3 decimals after dot "."

function calculateGpa(courses) {
  let sum = 0;
  courses.forEach((course) => {
    sum += course;
  });
  return sum / courses.length;
}

// && and, || or operation
