# Promptosaurus
NodeJS command line tool for handling prompted user input

## Usage
Promptosaurus is a constructor. Require it normally and create an instance:

`var rawr = new Promptosaurus()`

The instance API is as follows:

### `.add(str, func)`
Adds question & callback for each prompt to display the user.
Multiple questions will require multiple calls to `add()`
The callback function will get the user's response passed in as an argument

### `.askNext()`
Iterates through each set question/callback pair. If no further questions remain, it will call the function set in `done()`, and close the `readline interface` for  you.

### `.ask()`
Used as a semantic means to kick off the first prompt.
Pretty much behaves the same as `askNext()`, but will also include the "Dino Greeting" to the user to help indicate they'll need to provide some answers.

### `.done(func)`
Allows user to pre-define a callback once all set prompts have run.