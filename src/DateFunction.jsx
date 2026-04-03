import { Week } from "./Days";

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'pl-PL',
    { weekday: 'long' }
  ).format(date);
}

export function HourList() {
    const days = Week.map(day =>
        <li>{day.day} {day.hours}</li>
    );
  return (
    <ul>
        {days}
    </ul>
  );
}
export default function Today()
{
    return(
        <div>
            <div>
                <button onClick={HourList} className="button"></button>
            </div>
        </div>
    );
}