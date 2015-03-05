
                    __
                   / _)
          _.----._/ /
         /         /     PROMPTOSAURUS
      __/ (  | (  |      you bet jurasic works.
    /__.-''|_|--|_|



# Promptosaurus
NodeJS command line tool for handling prompted user input

## Usage
Promptosaurus is a constructor. Require it normally and create an instance:

`var rawr = new Promptosaurus()`

The instance API is as follows:

### `.add(str, func)`
Adds question & callback for each prompt to display the user.
Multiple questions will require multiple calls to `add()`
The callback function is optional, and if passed, will get the user's response passed in as an argument.
If the callback is not set, then the user input will be stored in Promptosaurus and accessible from within the `.done()` function.

### `.askNext()`
Iterates through each set question/callback pair. If no further questions remain, it will call the function set in `done()`, and close the `readline interface` for  you.

### `.ask()`
Used as a semantic means to kick off the first prompt.
Pretty much behaves the same as `askNext()`, but will also include the "Dino Greeting" to the user to help indicate they'll need to provide some answers.

### `.done(func)`
Allows user to pre-define a callback once all set prompts have run.
The callback will be passed an object with properties matching the provided answers.
Each property name will be prefixed with "input" + the numeric order it was recieved - i.e. first provided answer will be stored in property `input1`, second will be `input2` and so on.

#### Examples
The provided examples in the `example` directory should already be executable.
If not, then make them so by running `chmod`. Then, just call it normally to see it in action:

`./example/basic.js`

#### Tests
```javascript
npm install
npm test
````
