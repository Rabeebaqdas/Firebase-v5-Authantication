import React from 'react'

export const Login = ({email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,setHasAccount,emailError,passwordError}) => {
    return (
        <section className="login">
            <div className="loginContainer">
            
                <label>Email</label>
                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                     ) :
                        <>
                             <button  onClick={handleSignup}>Sign Up and Login</button>
                        <p>Have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    }
                </div>
            </div>


        </section>
    )
}

export default Login;