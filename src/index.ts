/** Number of numeric arguments each SVG path command expects (lowercase keys). */
const length: Record<string, number> = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }

/** Matches a single path command letter followed by its raw argument string. */
const segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig

/** Matches a single numeric token, including negatives, decimals, and scientific notation. */
const number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig

/** A parsed path command: the command letter followed by its numeric arguments. */
export type Command = [string, ...number[]]

/**
 * Parse an SVG path `d` attribute string into an array of commands.
 *
 * Each command is a tuple of `[letter, ...args]`. Relative commands use
 * lowercase letters; absolute commands use uppercase. An implicit `lineto`
 * is inserted after the first coordinate pair of a `moveto` with extra args,
 * per the SVG spec.
 *
 * @param path - The raw SVG path data string (e.g. `"M0,0 L10,10 Z"`).
 * @returns Array of parsed commands.
 * @throws {Error} if a command has fewer arguments than expected.
 */
function parse(path: string): Command[] {
  const data: Command[] = []
  path.replace(segment, (_, cmd: string, args: string) => {
    let type = cmd.toLowerCase()
    let command = cmd
    const values = parseValues(args)

    // SVG spec: extra args after an 'm' are treated as implicit 'l' commands.
    if (type === 'm' && values.length > 2) {
      data.push([command, ...values.splice(0, 2)] as Command)
      type = 'l'
      command = command === 'm' ? 'l' : 'L'
    }

    while (true) {
      if (values.length === length[type]) {
        data.push([command, ...values] as Command)
        return ''
      }
      if (values.length < length[type]) throw new Error('malformed path data')
      // Consume one command's worth of args; remaining args repeat the command.
      data.push([command, ...values.splice(0, length[type])] as Command)
    }
  })
  return data
}

/** Extract all numeric tokens from a raw argument string. */
function parseValues(args: string): number[] {
  const numbers = args.match(number)
  return numbers ? numbers.map(Number) : []
}

export default parse
