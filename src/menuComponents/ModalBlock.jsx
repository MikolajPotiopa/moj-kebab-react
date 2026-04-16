
export default function ModalBlock({dish}){
    
    return(
        <div>
            <img src={dish.src} alt={dish.alt} />
            <div>{dish.title}</div>
            <div>{dish.description}</div>
            <div>
                <div>
                    {dish.subTitle}
                    <div>Wymagane</div>
                    <div>Wybierz 1</div>
                </div>
                <ol>
                    {dish.info.map((item,index)=>(
                    <li key={index}>
                        <input type="radio" name="sizeRadio"/><label htmlFor="sizeRadio">{`${item.size} - ${item.cost} (${item.weight}g)`}</label> 
                    </li>
                    ))}
                </ol>
                
            </div>
        </div>
    );
}