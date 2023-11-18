function generateRandomCharacter() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += generateRandomCharacter();
  }
  return result;
}
