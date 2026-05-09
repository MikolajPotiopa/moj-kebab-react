

export default function Policy(){
    return(

        <div className="policyBox"> 
            <div className="policyContainer">
                <h1 className="policyTitle">POLITYKA PRYWATNOŚCI SERWISU GOLDEN KEBAB</h1>
                <p className="policyDate">Ostatnia aktualizacja: 09.05.2026</p>

                <section className="policySection">
                    <h2>1. INFORMACJE OGÓLNE</h2>
                    <p>
                        Administratorem danych osobowych zbieranych za pośrednictwem serwisu Golden Kebab jest 
                        <strong> Mikołaj Potiopa</strong>, prowadzący działalność gospodarczą w formie działalności 
                        nierejestrowanej. Kontakt z administratorem jest możliwy pod adresem e-mail: 
                        <a href="mailto:mikolaj.potiopa.biznes@gmail.com"> mikolaj.potiopa.biznes@gmail.com</a>.
                    </p>
                </section>

                <section className="policySection">
                    <h2>2. JAKIE DANE ZBIERAMY I W JAKIM CELU?</h2>
                    <p>Przetwarzamy dane osobowe użytkowników w celu realizacji zamówień gastronomicznych oraz zapewnienia poprawnego działania serwisu:</p>
                    <ul>
                        <li><strong>Dane zamówienia:</strong> Rodzaj wybranych produktów, sosów i dodatków – w celu przygotowania posiłku.</li>
                        <li><strong>Dane płatności:</strong> Adres e-mail, dane karty płatniczej (przetwarzane bezpośrednio przez operatora płatności Stripe) – w celu realizacji transakcji.</li>
                        <li><strong>Dane techniczne:</strong> Adres IP, typ przeglądarki – w celu zapewnienia bezpieczeństwa i stabilności serwisu.</li>
                    </ul>
                </section>

                <section className="policySection">
                    <h2>3. PODSTAWA PRAWNA PRZETWARZANIA</h2>
                    <p>Dane przetwarzane są na podstawie:</p>
                    <ul>
                        <li><strong>Art. 6 ust. 1 lit. b RODO</strong> – przetwarzanie jest niezbędne do wykonania umowy (realizacji zamówienia).</li>
                        <li><strong>Art. 6 ust. 1 lit. f RODO</strong> – prawnie uzasadniony interes administratora (zapewnienie bezpieczeństwa strony).</li>
                    </ul>
                </section>

                <section className="policySection">
                    <h2>4. ODBIORCY DANYCH (PODMIOTY TRZECIE)</h2>
                    <p>W celu poprawnej realizacji usług, Twoje dane mogą być przekazywane zaufanym partnerom technologicznym:</p>
                    <ul>
                        <li><strong>Stripe Payments Europe, Ltd:</strong> Obsługa bezpiecznych płatności online.</li>
                        <li><strong>Supabase, Inc:</strong> Przechowywanie danych o zamówieniach w bazie danych.</li>
                        <li><strong>Netlify, Inc:</strong> Hosting strony oraz obsługa funkcji systemowych (backend).</li>
                    </ul>
                    <p>Wszystkie te podmioty dbają o bezpieczeństwo danych zgodnie ze standardami międzynarodowymi.</p>
                </section>

                <section className="policySection">
                    <h2>5. TECHNOLOGIA LOCAL STORAGE I COOKIES</h2>
                    <p>Nasz serwis nie wykorzystuje uciążliwych ciasteczek śledzących. Korzystamy z technologii LocalStorage, która pozwala na zapisanie zawartości Twojego koszyka na Twoim urządzeniu. Dzięki temu:</p>
                    <ul>
                        <li>Koszyk nie czyści się po przypadkowym odświeżeniu strony.</li>
                        <li>Proces zamówienia jest szybszy i wygodniejszy.</li>
                    </ul>
                    <p>Możesz w każdej chwili wyczyścić te dane w ustawieniach swojej przeglądarki.</p>
                </section>

                <section className="policySection">
                    <h2>6. OKRES PRZECHOWYWANIA DANYCH</h2>
                    <p>Dane o zamówieniach przechowywane są przez okres niezbędny do realizacji zamówienia oraz do celów podatkowo-rozliczeniowych, nie dłużej jednak niż jest to wymagane przez obowiązujące przepisy prawa.</p>
                </section>

                <section className="policySection">
                    <h2>7. TWOJE PRAWA</h2>
                    <p>Zgodnie z RODO, przysługuje Ci prawo do:</p>
                    <ul>
                        <li>Wglądu w swoje dane oraz otrzymania ich kopii.</li>
                        <li>Sprostowania (poprawienia) swoich danych.</li>
                        <li>Usunięcia danych ("prawo do bycia zapomnianym").</li>
                        <li>Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).</li>
                    </ul>
                </section>

                <section className="policySection">
                    <h2>8. BEZPIECZEŃSTWO</h2>
                    <p>Wykorzystujemy szyfrowane połączenia SSL, a wszystkie operacje płatnicze odbywają się na zabezpieczonych serwerach firmy Stripe, posiadającej najwyższy certyfikat bezpieczeństwa PCI.</p>
                </section>
                <div className="backButtonContainer">
                    <a href="/" className="backButton">
                        Powrót do strony głównej
                    </a>
                </div>
            </div>
        </div>

        
    );
    
}