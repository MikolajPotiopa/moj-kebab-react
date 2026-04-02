import Kebab from './Kebaby.jsx'

  

export default function ShowApps()
{
  const kebab1 = 
  {
    size:'Large',
    meat:'Beef',
    sos:'Spicy'
  };
  const kebab2 = 
  {
    size:'Small',
    meat:'Chicken',
    sos:'Mild'
  };
  const kebab3 = 
  {
    size:'Medium',
    meat:'Mix',
    sos:'Mix'
  };
 
  return(
    <section>
      <Kebab kebab={kebab1} />
      <Kebab kebab = {kebab2}/>
      <Kebab kebab = {kebab3}/>
    </section>
    
  );
}


