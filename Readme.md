
# parse-svg-path

  A minimal svg path parser. For the delux model see [hughsk/svg-path-parser](https://github.com/hughsk/svg-path-parser).

## Installation

_With [packin](//github.com/jkroso/packin) or [component](//github.com/component/component)_

    $ packin add jkroso/parse-svg-path

then in your app:

```js
var parse = require('parse-svg-path')
```

## API

### parse(string)

  parse an svg path data string. Generates an Array
  of commands where each command is an Array of the
  form `[command, arg1, arg2, ...]`

```js
parse('m1 2 3 4') // => [['m',1,2],['l',3,4]]
```

## Running the tests

Just run `make` and navigate your browser to the test directory.
