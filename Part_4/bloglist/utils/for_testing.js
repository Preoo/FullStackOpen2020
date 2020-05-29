const palindrome = of_string => of_string.split('').reverse().join('')
const average = of_array => of_array.length ? of_array.reduce((a, n) => a + n, 0) / of_array.length : 0

module.exports = {
    palindrome,
    average
}