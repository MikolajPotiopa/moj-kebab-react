import { Week } from "./Days";
import { useState } from "react";
import { MdArrowDropUp ,MdOutlineArrowDropDown } from "react-icons/md";



const today = new Date();

const formatDate = (date) =>
    {
        return new Intl.DateTimeFormat(
            'pl-PL',
            { weekday: 'long' }
          ).format(date);
    }
    


export default function Today()
{
    const [showMore, setShowMore] = useState(false);
    const currentDayName = formatDate(today);
    const todayDate = Week.find(d => d.day.toLowerCase() === currentDayName.toLowerCase());
    function handleShowMore()
    {
        setShowMore(!showMore)
    }


    const days = Week.map((day,index) =>
            <li key={day.id} className="slideList" style={{animationDelay: `${index * 0.1}s`}} ><div className="secondBoxDays">{day.day}</div> <div className="secondBoxHours">{day.hours}</div></li>
        );
    return(
        <div className="secondBoxText">
            <div className="secondBoxButton">
                
                {!showMore ? <div className="secondBoxDni"><div>Dzisiaj: </div> {todayDate?.hours}</div>:<br/>}
                
                {showMore && <ul className="daysList">{days}</ul>}
                
            </div>
            <div>
                <button onClick={handleShowMore} > {showMore ? <MdOutlineArrowDropDown color='#FFFFFF' size='24px'/>:<MdArrowDropUp color='#FFFFFF' size='24px'/>}</button>
            </div>
        </div>
    );
}


