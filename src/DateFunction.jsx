import { Week } from "./Days";
import { useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";


const today = new Date();



export default function Today()
{
    const [showMore, setShowMore] = useState(false);
    
    function handleShowMore()
    {
        setShowMore(!showMore);
    }

    function formatDate(date) 
    {
        return new Intl.DateTimeFormat(
            'pl-PL',
            { weekday: 'long' }
          ).format(date);
    }

   

    const days = Week.map(day =>
            <li key={day.id}><div className="secondBoxDays">{day.day}</div> <div className="secondBoxHours">{day.hours}</div></li>
        );
    const todayHours = Week.filter((day)=>{
        return day.day==formatDate(today)
    });
    
    console.log(todayHours);
    console.log(formatDate(today));
    return(
        <div className="secondBoxText">
            <div className="secondBoxButton">
                
                {!showMore ? <div className="secondBoxDni"><div>Dzisiaj: </div> {todayHours[0]?.hours}</div>:<br/>}
                
                {showMore && <ul>{days}</ul>}
                
            </div>
            <div>
                <button onClick={handleShowMore} > {showMore ? <MdOutlineArrowDropDown color='#FFFFFF' size='24px'/>:<MdArrowDropUp color='#FFFFFF' size='24px'/>}</button>
            </div>
        </div>
    );
}