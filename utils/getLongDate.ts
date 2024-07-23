export function getLongDate(dateString: string): string{
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    const monthName = monthsOfYear[today.getMonth()];
    const dayOfMonth = today.getDate();

    return `${dayName}, ${monthName} ${dayOfMonth}`;
}
