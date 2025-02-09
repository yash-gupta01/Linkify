import { customAlphabet } from "nanoid";

// Utility to generate a unique short URL
class ShortenerUtil {
  static generateShortUrl(originalUrl) {
    const nanoid = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      10
    );
    return nanoid(); // Generates a unique 10-character ID
  }

  // Utility to validate if a given string is a valid URL
  static isValidUrl(url) {
    const regex =
      /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
  }

  // Utility to check if a shortened URL is valid
  static isValidShortenedUrl(shortenedUrl) {
    return shortenedUrl.length === 6; // Check if the shortened URL is of correct length
  }
}
export default ShortenerUtil;
