type NamesType = string | number | NamesObject | NamesType[];

interface NamesObject {
  [key: string]: any;
}

/**
 * Concatenates and returns a string of class names based on the input.
 *
 * @param names - The input class names. It can be a string, number, array, or object.
 * @returns The concatenated string of class names.
 */
export const cn = (...args: NamesType[]): string => {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg.toString());
      continue;
    }

    if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) {
        classes.push(inner);
      }
      continue;
    }

    if (argType === 'object') {
      for (const key in arg as any) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && (arg as NamesObject)[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
