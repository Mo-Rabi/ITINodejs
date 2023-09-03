//! 1. ** Create a function that takes the age in years and returns the age in days.
const returnDays = (years)=> {
    console.log(`You are: ${years*365.25} days old.`)
}

//! 2.** Create a function that takes an array of numbers and returns the smallest number in the set.
const returnSmallestNum = (arr) =>{
    console.log(Math.min(...arr));
}

//! 3.** Create a function that takes any non-negative number as an array and return it with its digits in descending order. Descending order is when you sort from highest to lowest (Quick Sort Algorithm)
function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], // middle element
        i = left, // left pointer
        j = right; // right pointer
    while (i <= j) {
        while (items[i] > pivot) { // Change the comparison to >
            i++;
        }
        while (items[j] < pivot) { // Change the comparison to <
            j--;
        }
        if (i <= j) {
            swap(items, i, j); // swapping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left = 0, right = items.length - 1) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); // index returned from partition
        if (left < index - 1) { // more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { // more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}

// Usage
quickSort([5, 6, 9, 11, 59, 321, 0, -5, -5, -4]);

//! 4.** Create a function that takes an array of numbers and returns the average of this numbers.
const calculateAverage = (numbers) => {
    if (numbers.length === 0) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return sum / (numbers.length-1);
};

//! 5.** what is the output of and explain your answer
console.log( [ ] == [ ] )//? false because it compares object(Arrays or Objects) references in heap memory (where objects and arrays get stored), not the contents of the objects is being compared here.
console.log( { } == { } )//? false because it compares object(Arrays or Objects) references in heap memory (where objects and arrays get stored), not the contents of the objects is being compared here.

//! 6.** what is the output of this code with explaination
function main() {
console.log("A");
setTimeout(function print() {
console.log("B");
}, 0);
console.log("C");
}
main();//? there are Two phases A.Memory allocation phase B. Execution context. In the memory allocation phase we only have the function "main" to store in memory. Next, Execution context will include the main function which outputs A, C, then B. A is in the execution context in the call stack and the gets executed and removed from the call stack last in first out. Then the set timeout function gets sent to the web apis and to be more specific to the macro task queue and it gets executed there and then goes to the event loop (event queue) Where it waits for the call stack to become empty. Sea gets logged to the console then the call stack is empty then the set timeout function output goes From the event queue to the call stack where it gets executed.

//! 7.** what is the output of this code with explaination
var num = 8;
var num = 10;
console.log(num);//? This will output 10 Because variables declared with var can be redeclared unlike variables declared with let Cannot be redeclared and gives an error.

//! 8.** what is the output of this code with explaination
function sayHi() {
console.log(name);
console.log(age);
var name = 'Ayush';
let age = 21;
}
sayHi(); //? First it will output undefined then it will output an error saying that you cannot use variables declared with let before initialization. It outputs undefined because variables declared with var or hoisted Plus we can use them before initialization (Assigning a value) But with let we cannot access variables before initialization even though it's hoisted.