let tl = gsap.timeline();
gsap.from("nav ul li",{
    filter:"blur(10px)",
    opacity:0,
    delay:0.5,
    duration:0.5,
    stagger:0.1,
})
document.querySelector("nav ul #signup").addEventListener("click",function(){
    tl.clear()
    tl.to("nav ul li",{
        display:"none",
        duration:0
    })
    tl.to("nav",{
        height:"86vh",
        duration:0.3
    })
    tl.to("nav ul .signup",{
        display:"block",
        opacity:1,
        duration:0.3,
    })
    gsap.to(".box1",{
        transform:"translateX(-95%) rotate(15deg)",
        duration:0.3,
    })
    gsap.to(".box2",{
        transform:"translateX(95%) rotate(-15deg)",
        duration:0.3,
    })
})
document.querySelector("nav ul .signup button:nth-child(6)").addEventListener("click",function(){
    tl.clear()
    tl.to("nav ul .signup",{
        display:"none",
        opacity:0,
        duration:0,
    })
    tl.to("nav",{
        height:"8vh",
        duration:0.3
    })
    tl.to("nav ul li",{
        display:"block",
        duration:0
    })
    gsap.to(".box1",{
        transform:"translateX(-95%)",
        duration:0.3,
    })
    gsap.to(".box2",{
        transform:"translateX(95%)",
        duration:0.3,
    })
    
}) 
document.querySelector("nav ul #signin").addEventListener("click",function(){
    tl.clear()
    tl.to("nav ul li",{
        display:"none",
        duration:0
    })
    tl.to("nav",{
        height:"86vh",
        duration:0.3
    })
    tl.to("nav ul .signin",{
        display:"block",
        opacity:1,
        duration:0.3,
    })
    gsap.to(".box1",{
        transform:"translateX(-95%) rotate(15deg)",
        duration:0.3,
    })
    gsap.to(".box2",{
        transform:"translateX(95%) rotate(-15deg)",
        duration:0.3,
    })
}) 
document.querySelector("nav ul .signin button:nth-child(6)").addEventListener("click",function(){
    tl.clear()
    tl.to("nav ul .signin",{
        display:"none",
        opacity:0,
        duration:0,
    })
    tl.to("nav",{
        height:"8vh",
        duration:0.3
    })
    tl.to("nav ul li",{
        display:"block",
        duration:0
    })
    gsap.to(".box1",{
        transform:"translateX(-95%)",
        duration:0.3,
    })
    gsap.to(".box2",{
        transform:"translateX(95%)",
        duration:0.3,
    })
    
})  


// backend

let token = localStorage.getItem("jwttoken");

let tokenobj = {
    token:token
}

if(token){
    fetch("/signin",{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(tokenobj),
    }).then(function(data){
        return data.json()
    }).then(function(data){
        alert(data.msg)
    })
}


document.querySelector("nav ul .signup button").addEventListener("click",function(){
    let name = document.querySelector("nav ul .signup span div:nth-child(1) input").value
    let email = document.querySelector("nav ul .signup span div:nth-child(2) input").value
    let password = document.querySelector("nav ul .signup span div:nth-child(3) input").value

    if(name && email && password){
        let obj={
            name:name,
            email:email,
            password:password
        }
        fetch("/signup",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(obj)
        }).then(function(data){
            return data.json()
        }).then(data=>{
                alert(data.msg)
        })
    }
    else{
        alert("Fill all the particluars!!")
    }
})

document.querySelector("nav ul .signin button").addEventListener("click",function(){
    let email = document.querySelector("nav ul .signin span div:nth-child(1) input").value
    let password = document.querySelector("nav ul .signin span div:nth-child(2) input").value

    if(email && password){
        let obj={
            email:email,
            password:password
        }
        fetch("/signin",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(obj)
        }).then(function(data){
            return data.json()
        }).then(data=>{
                alert(data.msg)
                if(data.token){
                    localStorage.setItem("jwttoken",data.token)
                }
        })
    }
    else{
        alert("Fill all the particluars!!")
    }
})

