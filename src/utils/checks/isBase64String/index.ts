export const isBase64String = (str: string) => {
  // Check if the string is empty
  if (!str) {
    return false;
  }

  // RFC 4648 specifies that Base64 strings are made up of:
  // Alphabet: [A-Za-z], Numbers: [0-9], Characters: [+], [/] and [=].
  // [=] sign is used as padding character. Valid Base64 string length should be multiple of 4.
  // Let's keep separate regex for base64 check and padding check
  const base64Regex = /^[A-Za-z0-9+/]*$/;
  const paddingRegex = /^(?:[A-Za-z0-9+/]{4})*((?:[A-Za-z0-9+/]{2}==)|(?:[A-Za-z0-9+/]{3}=))?$/;

  // check base64 string and padding
  if (!base64Regex.test(str) || !paddingRegex.test(str)) {
    return false;
  }

  try {
    // Check if the decode is successful
    atob(str);
    return true;
  } catch (err) {
    // If atob throws an error, the input is not a valid base64 string
    return false;
  }
};
