// Hàm kiểm tra một số có phải là số nguyên tố hay không
/**
 * Checks whether a given integer is a prime number.
 *
 * This function returns true if the provided number is a prime (greater than 1 and divisible only by 1 and itself).
 * Note: the implementation performs a simple trial division from 2 up to num - 1 (O(n) time complexity) and therefore
 * is not optimized for large inputs. The function expects an integer input; non-integer values may produce incorrect results.
 *
 * @param {number} num - The number to test for primality. Expected to be an integer.
 * @returns {boolean} True if num is prime, otherwise false.
 *
 * @example
 * // returns true
 * isPrime(7);
 *
 * @example
 * // returns false
 * isPrime(4);
 *
 * Vietnamese:
 * Hàm kiểm tra xem một số nguyên có phải là số nguyên tố hay không. Trả về true nếu là số nguyên tố (>1), ngược lại trả về false.
 */
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Viết hàm đảo ngược một chuỗi
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Hàm tìm số lớn nhất trong mảng
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
