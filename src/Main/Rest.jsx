import MapSection from "../restCommponents/MapSection";
import MapSectionTitle from "../restCommponents/MapSectionTitle";
import ContactInfo from "../restCommponents/ContactInfo";
import Footer from "../restCommponents/Footer";

export default function Rest(){
    return(
        <div className="rest">
            <MapSectionTitle></MapSectionTitle>
            <MapSection></MapSection>
            <ContactInfo></ContactInfo>
            <Footer></Footer>
        </div>
        
    );
}