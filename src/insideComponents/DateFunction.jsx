import { Week } from "../tablesOfData/Days";
import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";
import { MdArrowDropUp ,MdOutlineArrowDropDown } from "react-icons/md";
import { unOrderListVariant,elementListVariant,divVariant,boxTextVariant } from "../tablesOfData/variants";




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



    return(
        <motion.div className="secondBoxText" variants={boxTextVariant} initial="initial" whileInView="show" >
            <AnimatePresence mode="wait">
                    {!showMore?(
                        <motion.div key="short"
                        variants={divVariant}
                        initial="initial" animate="animate" exit="exit"
                        className="secondBoxDni"
                        >
                            <div>Dzisiaj: </div> {todayDate?.hours}
                        </motion.div>
                    ) : (
                    <motion.ul
                        key="long"
                        variants={unOrderListVariant}
                        initial="initial" whileInView="show" exit="exit"
                    >
                        {Week.map((day) => (
                            <motion.li key={day.id} variants={elementListVariant} className="slideList">
                                <div className="secondBoxDays">{day.day}</div> 
                                <div className="secondBoxHours">{day.hours}</div>
                            </motion.li>
                        ))}
                    </motion.ul>
                    )}
            </AnimatePresence> 

                
                <button onClick={handleShowMore} > {showMore ? <MdOutlineArrowDropDown color='#FFFFFF' size='24px'/>:<MdArrowDropUp color='#FFFFFF' size='24px'/>}</button>
                
        </motion.div>
    );
}


