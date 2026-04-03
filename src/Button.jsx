

export default function Button({className,value})
{
    return(
        <div className={className}>
                <button>{value}</button>
        </div>
    );
}