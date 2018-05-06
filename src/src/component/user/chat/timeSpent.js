export default function timeSpent(time) {
  var diff = Date.now() - time;
  if (diff > 1000 * 60 * 60 * 24) {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var date = new Date(time);
    var inSec =
      months[date.getUTCMonth()] +
      ' ' +
      date.getUTCDate() +
      ', ' +
      date.getUTCFullYear();
  } else if (diff > 1000 * 60 * 60) {
    var inSec = Math.floor(diff / (1000 * 60 * 60)) + ' hour';
  } else if (diff > 1000 * 60) {
    var inSec = Math.floor(diff / (1000 * 60)) + ' min';
  } else if (diff > 1000) {
    var inSec = Math.floor(diff / 1000) + ' sec';
  }
  return inSec || 'just now';
}
