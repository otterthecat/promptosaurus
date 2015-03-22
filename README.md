
                    __
                   / _)
          _.----._/ /
         /         /     PROMPTOSAURUS
      __/ (  | (  |      you bet jurassic works.
    /__.-''|_|--|_|



# Promptosaurus
NodeJS command line tool for handling prompted user input

## Usage
Promptosaurus is a constructor. Require it normally and create an instance:

```javascript
#!/usr/bin/env node
#!/usr/bin/env node
var Promptosaurus = require('promptosaurus');
var rawr = new Promptosaurus();

rawr.add('Would you like to play a game of chess (y | n)?', function(answer){

    this.hasValidResponse = (answer === 'y' || answer === 'n');
    this.log('You have responded with: ' + answer);
})
.done(function(){
    this.log('You were asked: ' + this.queries[0].prompt);
    this.log('You responded with: ' + this.queries[0].response);
})
.ask();
```
The instance API is as follows:

### `.add(str, func)`
Adds question & callback for each prompt to display the user.
Multiple questions will require multiple calls to `add()`
The callback function is optional, and if passed, will get the user's response passed in as an argument.
If the callback is not set, then the user input will be stored in Promptosaurus and accessible from within the `.done()` function.

### `.ask()`
Used as a semantic means to kick off the first prompt.
Pretty much behaves the same as `askNext()`, but will also include the "Dino Greeting" to the user to help indicate they'll need to provide some answers.

### `.done(func)`
Allows user to pre-define a callback once all set prompts have run.
The callback will be passed an object with properties matching the provided answers.
Each property name will be prefixed with "input" + the numeric order it was recieved - i.e. first provided answer will be stored in property `input1`, second will be `input2` and so on.

### `.log(string)`
Basically just a wrapper for `process.stdout.write()`, but includes coloring of output to match other colors and whitespace of default Promptosaurus output. Accessible withing callbacks via `this.log(string)`.
[See examples for more information](https://github.com/otterthecat/promptosaurus/tree/master/examples).

### `.hasValidResponse [boolean]`
Defaults to `true`. This is a flag that is used to determine if the current prompt needs to be asked again - say if the user's response is not what you were expecting. Setting this to `false` will notify the user their response wasn't acceptable, and will then ask them again for a proper response. If set to `true` (which is also the default), the user will be presented the next prompt in queue after they give a response.
[See examples for more information](https://github.com/otterthecat/promptosaurus/tree/master/examples).

#### Examples
The provided [examples](https://github.com/otterthecat/promptosaurus/tree/master/examples) should already be executable.
If not, then make them so by using `chmod`. Then, just call it normally to see it in action:

`./example/basic.js`

#### Tests
```javascript
npm install
npm test
````
#### Changelog
1.0.0
 * added ability to repeat question if response is not considered valid.
 * Callback for `.done()` is no longer passed an argument in favor of direct access to `.queries` property.
 * `.queries` property has been changed from object to array.

0.1.0
 * initial release
