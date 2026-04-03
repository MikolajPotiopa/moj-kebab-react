import { Week } from "./Days";
import { useState } from "react";

const today = new Date();



export default function Today()
{
    const [showMore, setShowMore] = useState(false);
    function handleShowMore()
    {
        setShowMore(!showMore);
    }
    function formatDate(date) {
        return new Intl.DateTimeFormat(
            'pl-PL',
            { weekday: 'long' }
          ).format(date);
        }
    const days = Week.map(day =>
            <li>{day.day} {day.hours}</li>
        );
    
    return(
        <div>
            <div className="secondBoxButton">
                <button onClick={handleShowMore} ></button>
            </div>
            <div>

            </div>
        </div>
    );
}