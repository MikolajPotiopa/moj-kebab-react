

export default function TopNav({value,dir })
{
    return(
        <div className="topNav">
            <a href={dir}>{value}</a>
        </div>
    );
}