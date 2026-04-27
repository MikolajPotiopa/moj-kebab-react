import { animate, delay, easeIn, scale, transform } from "framer-motion"
import { RxShadow } from "react-icons/rx"

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
        transition:{duration: 1,ease: "easeOut",delay:1}
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

export const onlineReservationVariant=
{
    hoverState:
    {
        backgroundColor: 'black',
        color: 'rgba(223, 152, 0,1)',
        border: '4px solid rgba(223, 152, 0,0.2)',
        scale: 1.05,
        transition:{duration:0.1}
    },
    tapState:
    {
        scale:0.95
    },
    initial:
    {
        backgroundColor: 'rgba(223, 152, 0,1)',
        color: 'rgba(0,0,0,1)',
        border: '4px rgba(0, 0,0,0)',
        scale: 1.00,
        opacity:0,
        x:250
    },
    show:{
        opacity:1,
        x:0,
        transition:{duration: 1,type: "spring", stiffness: 100,damping: 10 }
    }
}

export const iconVariant=
{
    initial:{
        opacity:0
    },
    show:{
        opacity:1,
        transition:{duration: 1,ease: "easeIn"}
    }
}
export const titleBoxTextVariant=
{
    initial:{
        opacity:0,
        x:-250
    },
    show:{
        opacity:1,
        x:0,
        transition:{duration: 1,type: "spring", stiffness: 100,damping: 10 }
    }
}
export const boxTextVariant=
{
    initial:{
        opacity:0,
        x:250
    },
    show:{
        opacity:1,
        x:0,
        transition:{duration: 1,type: "spring", stiffness: 100,damping: 10 }
    }
} 
export const unOrderListVariant=
{
    initial:{
        opacity:0
    },
    show:{
        opacity:1,
        transition:{staggerChildren:0.1}
    },
    exit:{
        opacity:0,
        transition:{
            staggerChildren: 0.1,
            staggerDirection: -1,
            when: "afterChildren"
        }
    }
}
export const elementListVariant=
{
    initial:{
        opacity:0,
        y:-50,
        rotate:-45
    },
    show:{
        opacity:1,
        y:0,
        rotate:0
    },
    exit:{
        opacity:0,
        y:-50,
        rotate:-45
    }
}
export const divVariant=
{
    initial:{
        opacity:0,
        
    },
    animate:{
        opacity:1,
    },
    exit:{
        opacity:0,
    },
    show:{
        opacity:1
    }
}
export const postInfoVariant=
{
    initial:{
        opacity:0,
        x:-300
    },
    show:{
        x:0,
        opacity:1,
        transition:{duration:0.5,type:"easeIn"}
    }
}
export const postImgsVariant=
{
    initial:{
        opacity:0,
        x:300
    },
    show:{
        x:0,
        opacity:1,
        transition:{duration:0.5,type:"easeIn"}
    }
}
export const postInfoButtonVariant=
{
    hoverState:
    {
        backgroundColor: 'black',
        color: 'rgba(223, 152, 0,1)',
        border: '4px solid rgba(223, 152, 0,0.2)',
        scale: 1.05,
        transition:{duration:0.1}
    },
    tapState:
    {
        scale:0.95
    },
    initial:
    {
        backgroundColor: 'rgba(223, 152, 0,1)',
        color: 'rgba(0,0,0,1)',
        border: '4px rgba(0, 0,0,0)',
        scale: 1.00
    }
}
export const dishBoxButtonVariant={
    initial:{
        backgroundColor: 'rgba(223, 152, 0,1)',
        color: 'rgba(0,0,0,1)',
       
        scale: 1.00
    },
    hoverState:
    {
        backgroundColor: 'black',
        color: 'rgba(223, 152, 0,1)',
        scale: 1.05,
        transition:{duration:0.1}
    }
}
export const dishInfoVariant={
    initial:{
        opacity:0
    },
    show:{
        transition:({duration:0.3,ease:easeIn}),
        opacity:1
    }
}
export const cartButtonVariant={
    initial:{
        scale:1.00,
        boxShadow: "0px 0px 0px rgba(223, 152, 0,1)"
    },
    hoverState:{
        scale:1.03,
        y:2,
        boxShadow:"0px 1px 15px rgba(223, 152, 0,1)",
        transition:{duration:0.2,ease:easeIn}
    },
    tapState:{
        scale:1.0,
        y:2,
        boxShadow:"0px 1px 15px rgba(223, 152, 0,1)",
        transition:{duration:0.2,ease:easeIn}
    }
}
export const cartBlockCloseBtnVariant={
    initial:{
        backgroundColor:'rgba(0,0,0,1)',
        ratate:0
    },
    hoverState:{
        backgroundColor:'rgba(223, 152, 0,1)',
        rotate:90,
        transition:{type: "spring", stiffness: 100,power:10}
    }
}

export const cartBuyBtnVariant = {
    initial:{
        boxShadow: "10px 10px 20px rgba(223, 152, 0, 0.2)",
        scale:1.00,
    },
    hoverState:{
        boxShadow: "10px 20px 30px rgba(223, 152, 0, 0.2)",
        scale:1.10,
    },
    tapState:{
        boxShadow: "10px 20px 30px rgba(138, 112, 55, 0.2)",
        scale:1.05,
    }
}

