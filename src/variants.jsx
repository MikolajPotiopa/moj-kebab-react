import { animate, delay, easeIn } from "framer-motion"

export const headerButtonVariant = 
{
    hoverState: 
    { 
        backgroundColor: 'var(--color-orange)',
        color: 'rgba(0,0,0,1)', 
        scale: 1.1,
        transition:{ duration:0.2} 
    },
    tapState:
    {
        scale:0.95
    },
    initial:
    {
        backgroundColor: 'rgba(0,0,0,0)',
        color:'white',
        scale:1.00
    }
}
export const secondButtonVariant = 
{
    hoverState:
    {
        backgroundColor: 'black',
        color: 'var(--color-orange)',
        border: '4px solid rgba(223, 152, 0,0.2)',
        scale: 1.05,
        transition:{duration:0.2}
    },
    tapState:
    {
        scale:0.95
    },
    initial:
    {
        backgroundColor: 'var(--color-orange)',
        color: 'rgba(0,0,0,1)',
        border: '4px solid rgba(0, 0,0,0)',
        scale: 1.00,
        opacity:0,
        y:-20
    },
    animate:
    {
        opacity:1,
        y:0,
        transition:{duration: 1,ease: "easeOut",delay:0.5}
    }

}
export const topNavVariant =
{
    hoverState:
    {
        color:'var(--color-orange)',
        transition:{duration:0.01}
    },
    initial:
    {
        color:'rgba(255,255,255,1)',
        transition:{duration:0.01}
    }
}
export const facebookVariant=
{
    hoverState:
    {
        backgroundColor: 'black',
        color: 'var(--color-orange)',
        border: '4px solid rgba(223, 152, 0,0.2)',
        scale: 1.05,
        transition:{duration:0.3}
    },
    initial:
    {
        backgroundColor: 'var(--color-orange)',
        color: 'rgba(0,0,0,1)',
        border: '4px rgba(0, 0,0,0)',
        scale: 1.00
    }
}

export const titleVariant=
{
    initial:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{duration: 2,ease: "easeOut",delay:0.2}
    }
    
}

export const titleTextVariant=
{
    initial:{
        opacity:0,
        y:-50
    },
    animate:{
        opacity:1,
        y:0,
        transition:{duration: 1,ease: "easeOut",delay:0.5}
    }
}
