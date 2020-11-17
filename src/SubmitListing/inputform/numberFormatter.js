class Formatter {
  constructor(arg) {
    const {
      prefix,
      postfix,
      value,
      prefixSpace = true,
      postfixSpace = true,
      selectionRange,
      delimeter = ',',
    } = arg;
    this.prefix = prefix;
    this.postfix = postfix;
    this.value = value;
    this.prefixSpace = prefixSpace;
    this.postfixSpace = postfixSpace;
    this.selectionRange = selectionRange;
    this.delimeter = delimeter;
  }

  filterInt() {
    const a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const string = this.value
      .split('')
      .filter((charA) => charA === a.find((charB) => charB === charA));
    if (!string.length) return '';
    return string.join('').match(/[0-9]*\.?[0-9]*/)[0];
  }

  numberValue() {
    return parseInt(this.filterInt());
  }

  formatValue() {
    const number = this.parseNumber();
    let string;
    if (number) {
      if (this.prefix) {
        if (this.prefixSpace) {
          string = `${this.prefix} ${number}`;
        } else {
          string = `${this.prefix}${number}`;
        }
      } else if (this.postfix) {
        if (this.postfixSpace) {
          string = `${number} ${this.postfix}`;
        } else {
          string = `${number}${this.postfix}`;
        }
      } else {
        string = number;
      }
    } else {
      string = '';
    }
    return string;
  }
  stickCursor(target) {
    let { start, valueLen } = this.selectionRange;
    const calc = this.formatValue().length - valueLen;
    if (calc === 1) start++;
    if (calc === -1) start--;
    if (this.prefix) {
      const a = target.value.search(/\d/);
      console.log('a', a);
      console.log('start', start);
      if (start <= a) target.setSelectionRange(a + 1, a + 1);
      if (start > a) target.setSelectionRange(start, start);
    } else if (this.postfix) {
      const a = target.value.split(' ')[0];
      if (start > a.length) start = a.length;
      target.setSelectionRange(start, start);
    }
  }
}

class NumberFormat extends Formatter {
  parseNumber() {
    const float = this.filterInt().split('.');
    const wholeNumber = float[0].replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      `$1${this.delimeter}`
    );
    if (float.length === 1) return wholeNumber;
    return `${wholeNumber}.${float[1]}`;
  }
}

export default NumberFormat;
// export default Formatter;
