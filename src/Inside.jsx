import TimeOpen from "./TimeOpen";
import Localisation from "./Localisation";
import OnlineReservation from "./OnlineReservation";

export default function Inside()
{
    return(
        <div className="inside">
            <div className="boxes">
                <Localisation></Localisation>
                <TimeOpen></TimeOpen>
                <OnlineReservation></OnlineReservation>
            </div>
            
        </div>
    );
}