import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";



function Login(){
    const [loginData,setLoginData]=useState({
        Email:"",
        Password:""
    })
    const navigate=useNavigate();
    const handleInput=(event)=>{
    let fileEmail=event.target.name
    let newValue=event.target.value

    setLoginData((curent)=>{
       
        return {...curent,[fileEmail]:newValue}
    })
}
const handleLogin= async(e)=>{
     e.preventDefault();
     const response = await fetch("http://localhost:5000/users");
     const users= await response.json();
     console.log("The users are ",users)
     const userFound= users.find(

        user=>
            user.Email === loginData.Email &&
            user.Password===loginData.Password
     )
     if(userFound){
      localStorage.setItem("user", JSON.stringify(userFound));
       navigate("/Profile")

    
             
     }else{
    alert("Incorrect Email or Password")}
     console.log(userFound)
}
    return(
        <>
        <h3 className="login-title">Login</h3>

        <form action="" className="login-form" >

            <div className="login-email">
                <label >Email : </label>
                <input type="email" 
                placeholder="Enter your email" 
                value={loginData.Email}
                onChange={handleInput}
                name="Email" 
                /></div>
            <br />
             <div className="login-password">
                <label htmlFor="">Password : </label>
                 <input type="Password" 
                 placeholder="Enter your password" 
                 value={loginData.Password}
                 onChange={handleInput}
                 name="Password"
                 /></div>


            <div className="login-buttons">
                <button type="button" className="signup-btn" onClick={()=>navigate("/SignUp")} >Sign Up</button>
        
                <button type="submit"
                 className="login-btn"
                  onClick={handleLogin}

                   >
                    Login </button>

                
            </div>
            
            


        </form>
        
        
        
        </>
    )




}
export  default Login;
