// export const unAlias = (str) => {
//     return str.replaceAll('[Char]', 'String')
// }

export function arrEq(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.every((item, index) => item === array2[index])
    );
  }
