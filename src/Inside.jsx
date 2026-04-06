import TimeOpen from "./TimeOpen";
import Localisation from "./Localisation";
import OnlineReservation from "./OnlineReservation";
import Today from "./DateFunction";

export default function Inside()
{
    const onlineReservationVariant=
    {
        hoverState:
        {
            backgroundColor: 'black',
            color: 'rgba(223, 152, 0,1)',
            border: '4px solid rgba(223, 152, 0,0.2)',
            scale: 1.05,
            transition:{duration:0.1}
        },
        tapState:
        {
            scale:0.95
        },
        initial:
        {
            backgroundColor: 'rgba(223, 152, 0,1)',
            color: 'rgba(0,0,0,1)',
            border: '4px rgba(0, 0,0,0)',
            scale: 1.00
        }
    }
    return(
        <div className="inside">
            <div className="boxes">
                <Localisation></Localisation>
                <TimeOpen></TimeOpen>
                <OnlineReservation variant={onlineReservationVariant}></OnlineReservation>
            </div>
            
        </div>
    );
}