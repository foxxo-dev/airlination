var currentDate = new Date();

// Array of month names
var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Get day, month, and year
var day = currentDate.getDate();
var monthIndex = currentDate.getMonth();
var year = currentDate.getFullYear();
export function createDateAsText() {
  // Create the text representation of the date
  var dateText = monthNames[monthIndex] + ' ' + day + ', ' + year;
  return dateText;
}
