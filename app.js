/* Constructor called typeWriter, the function will take in 3 arguments
1.theTextElement -> which will be the span in the html
2. words -> comes from the data-words attribute
3. wait -> amt of time it waites before it begins to delete
*/
class Typewriter {
    constructor(theTextElement, words, wait = 3000) {
        // assign properties in constructor using the this keyword
        this.theTextElement = theTextElement;
        this.words = words;
        // set to nothing by default, its whats currently in the area beginning to type
        this.txt = '';
        // we need to know the index of the array, we need to know the word we are on
        this.txtWordIndex = 0;
        // equal to whatever is passed in wait about, but we need to mae sure its an integer so we use parseInt: converts string to number, we want 10 bc its a "base 10 number"
        this.wait = parseInt(wait, 10);
        // the main method that is associated with the typewriter that does everything 
        this.type();
        // this deletes the words once completed, represents the state of whether it is deleting or not
        this.deleteWords = false;
    }
    // Type Method - after prototype call the name of the method which is type
    type() {
        // Need current index of word, use % bc we want total lenghth of words array
        const currentIndex = this.txtWordIndex % this.words.length;
        // Want the full text of the word its on of currentIndex
        const fullTxt = this.words[currentIndex];
        //check if deleting
        if(this.deleteWords) {
            // remove character": if its deleting=ng then -1
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // add charachter
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // insert txt into element - creating a new span, bc in css we will create the cursor effect and inside we want the current word - and we use back ticks to be able to use a template literal
        this.theTextElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Type Speed : gonna change the speed @ diff. points. when it deletes I want it to go faster , when it goes to the end i want it to pause so i need to use the wait to pause it
        let typeSpeed = 300;
        if(this.deleteWords) {
            // cut the time in half
            typeSpeed /= 2;
        } 

        // Check to see if the word is complete by matchong the full text of the word in the ``, so
        //so if this.txt is equal to Programmer, which is the first word then, we want to do a few things: set typespeed to w/e the wait value is in order to pause, and its its equal to 3 secs then itll create apuse
        if(!this.deleteWords && this.txt === fullTxt) {
            // makes pause
            typeSpeed = this.wait;
            // set to true
            this.deleteWords = true;
            // the conditional below runs as soon as the word has deleted entirely, making it true = ''
        } else if (this.deleteWords && this.txt === '') {
            this.deleteWords = false;
            //move to next word now
            this.txtWordIndex++;
            // pause before start typing
            typeSpeed = 500
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

/*Substring Note used above: Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end. If end is omitted, the characters from start through the end of the original string are returned.
Returns the substring at the specified location within a String object. */


// Run (init) when DOM loads, so we need an event handler
document.addEventListener('DOMContentLoaded', init);

// Init App -  need to get attributes,(words, wait time etc) the span the whole elemts itself.
// the const words explanation: we assign the text to words, and we use JSON.parse bc otherwise its just looked at as a string, so we need this to run properly. and we use getAttribute to capture all the data-words from the html 
// init Typewriter using new keyword and pass in all the function args, and it will initialize it
function init() {
    const theTextElement = document.querySelector('.txt-type');
    const words = JSON.parse(theTextElement.getAttribute('data-words'));
    const wait = theTextElement.getAttribute('data-wait');
    //init Typewriter - new keyword
    new Typewriter(theTextElement, words, wait);
}




// Code w/o the notes below for clearer view and reference of order

// class Typewriter {
//     constructor(theTextElement, words, wait = 3000) {
//         this.theTextElement = theTextElement;
//         this.words = words;
//         this.txt = '';
//         this.txtWordIndex = 0;
//         this.wait = parseInt(wait, 10);
//         this.type();
//         this.deleteWords = false;
//     }
//     // Type Method 
//     type() {
//         const currentIndex = this.txtWordIndex % this.words.length;
//         const fullTxt = this.words[currentIndex];
//         if(this.deleteWords) {
//             this.txt = fullTxt.substring(0, this.txt.length - 1);
//         } else {
//             this.txt = fullTxt.substring(0, this.txt.length + 1);
//         }

//         this.theTextElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//         let typeSpeed = 300;
//         if(this.deleteWords) {
//             typeSpeed /= 2;
//         } 

//         if(!this.deleteWords && this.txt === fullTxt) {
//             typeSpeed = this.wait;
//             this.deleteWords = true;
//         } else if (this.deleteWords && this.txt === '') {
//             this.deleteWords = false;
//             this.txtWordIndex++;
//             typeSpeed = 500
//         }

//         setTimeout(() => this.type(), typeSpeed);
//     }
// }

// document.addEventListener('DOMContentLoaded', init);

// function init() {
//     const theTextElement = document.querySelector('.txt-type');
//     const words = JSON.parse(theTextElement.getAttribute('data-words'));
//     const wait = theTextElement.getAttribute('data-wait');
//     //init Typewriter - new keyword
//     new Typewriter(theTextElement, words, wait);
// }
