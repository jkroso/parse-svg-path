# parse-svg-path

A minimal SVG path data parser. Returns a structured array of commands that's easy to iterate and transform.

For a more full-featured parser see [hughsk/svg-path-parser](//github.com/hughsk/svg-path-parser), or for a streaming parser see [nfroidure/SVGPathData](//github.com/nfroidure/SVGPathData).

## Installation

```sh
npm install parse-svg-path
```

## Usage

```ts
import parse from 'parse-svg-path'

const commands = parse('M10 20 L30 40 Z')
// [['M', 10, 20], ['L', 30, 40], ['Z']]
```

Each command is an array whose first element is the command letter (preserving its original case) followed by its numeric arguments.

Overloaded `m`/`M` commands — where more than 2 arguments are provided — are automatically split into an initial move followed by implicit `l`/`L` line commands:

```ts
parse('m 12.5,52 39,0 0,-40')
// [['m', 12.5, 52], ['l', 39, 0], ['l', 0, -40]]
```

## API

### `parse(path: string): Command[]`

Parses an SVG path data string and returns an array of commands.

```ts
type Command = [string, ...number[]]
```

Throws an `Error` with the message `"malformed path data"` if a command has fewer arguments than required.

### Supported commands

| Letter | Command              | Arguments |
| ------ | -------------------- | --------- |
| M / m  | Move to              | x, y      |
| L / l  | Line to              | x, y      |
| H / h  | Horizontal line to   | x         |
| V / v  | Vertical line to     | y         |
| C / c  | Cubic Bézier curve   | x1, y1, x2, y2, x, y |
| S / s  | Smooth cubic curve   | x2, y2, x, y |
| Q / q  | Quadratic Bézier     | x1, y1, x, y |
| T / t  | Smooth quadratic     | x, y      |
| A / a  | Arc                  | rx, ry, x-rotation, large-arc, sweep, x, y |
| Z / z  | Close path           | —         |

Uppercase letters use absolute coordinates; lowercase use relative coordinates.

## Development

```sh
npm test          # run tests once
npm run test:watch  # watch mode
npm run build     # build dist/
```

## Publishing

Bump the version, then push — `prepublishOnly` runs the build automatically:

```sh
npm version patch  # or minor / major
git push && git push --tags
npm publish
```
