import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdź, czy użytkownik już zaakceptował
    const consent = localStorage.getItem('golden_kebab_cookies');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('golden_kebab_cookies', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '600px',
      backgroundColor: '#111', 
      border: '1px solid #ff9800', 
      padding: '20px',
      borderRadius: '12px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      textAlign: 'center'
    }}>
      <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
        <strong style={{ color: '#ff9800' }}>GOLDEN KEBAB</strong> korzysta z technologii LocalStorage, aby pamiętać Twój koszyk i zapewnić bezpieczne płatności. Pozostając na stronie, akceptujesz nasze zasady.
      </p>
      <button 
        onClick={acceptCookies}
        style={{
          backgroundColor: '#ff9800',
          color: '#000',
          border: 'none',
          padding: '10px 30px',
          fontWeight: '900',
          borderRadius: '50px',
          cursor: 'pointer',
          textTransform: 'uppercase'
        }}
      >
        Akceptuję
      </button>
    </div>
  );
};

export default CookieBanner;