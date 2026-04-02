export default function Kebab({kebab})
{
    const theme ={
        backgroundColor: 'black',
        color: 'red'
    };


    if (kebab.sos=='Spicy')
    {
        return <h1 style={theme} > Kebab:  {kebab.size} {kebab.meat} {kebab.sos}🔥 </h1>
    }else if(kebab.sos=='Mild')
    {
        return <h1 style={theme} > Kebab:  {kebab.size} {kebab.meat} {kebab.sos}🍼 </h1>
    }else if(kebab.sos == "Mix")
    return <h1 style={theme} > Kebab:  {kebab.size} {kebab.meat} {kebab.sos}🖖 </h1>
        
    
}