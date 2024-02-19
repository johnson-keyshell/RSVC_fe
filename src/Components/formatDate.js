import { format, isToday, isYesterday, getDay, addDays } from 'date-fns'; // Import date-fns functions


const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, 'HH:mm'); // Display time for today
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd/MM/yy'); // Display full date for other days
  }
};



const formatDateGeneral = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();

  if (isToday(date)) {
    return 'Today'; // Display time for today
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (date >= addDays(today, -6) && date <= today) {
    // Display the day of the week for dates within the current week
    const dayOfWeek = getDay(date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayOfWeek];
  } else {
    // Display the full date in the desired format
    return format(date, 'd MMMM yyyy');
  }
};


const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  if (date) {
    return format(date, 'HH:mm');
  }
};


export default formatDate;
export { formatDateGeneral, formatDateTime };
