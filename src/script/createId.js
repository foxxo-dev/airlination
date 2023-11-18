import { createDateAsText } from './createDateAsText';
import { generateRandomString } from './randomCharacters';

export function createId(type) {
  const dateText = createDateAsText();
  const randomString = generateRandomString(20);
  const randomNumber = Math.round(
    Math.random() * 10000000000000000000
  ).toString();
  if (type === 'domestic') {
    const id = type + '-' + dateText + '-' + randomString + '-' + randomNumber;
    return id;
  } else if (type === 'world') {
    const id =
      type + '---' + dateText + '-' + randomString + '-' + randomNumber;
    return id;
  } else {
    alert("SYSTEM ERROR: type must be 'domestic' or 'world");
    return new Error("SYSTEM ERROR: type must be 'domestic' or 'world");
  }
}
