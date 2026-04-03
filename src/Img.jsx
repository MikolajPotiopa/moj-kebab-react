

export default function Img({className,imgSrc,imgAlt})
{
        return(
            <div className={className}>
                <img src={imgSrc} alt={imgAlt} />
            </div>            
        );
}