

export default function Link({className,href,value})
{
    return(
        <a href={href} className={className}>
            <div>
                {value}
            </div>
        </a>
        
    );
}