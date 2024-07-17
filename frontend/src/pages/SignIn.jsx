import React from 'react'

function SignIn() {
  return (
    <div><div className="wrapper">
    
    

    {/*Form*/}
    <form className="form" action = "#" method = "POST">
        <fieldset className = "fldt">
            <div className="form-header">
                <h2> Sign In to MaidMatch </h2>
            </div>
        
        
            <div className="form-boxes">
                
                <label for="email">Email</label>
                <input type="text" id="email" placeholder = "Email"/>
                
            </div>
            
            <div className="form-boxes">
                
                <label for="password">Password</label>
                <input type="password" id = "password" placeholder = "Password"/>
            </div>
            
            <div className="btn">
                <button role="button" className="form-sbmt-btn">Login</button>
                
            </div>
            
        </fieldset> 
            
        

    



    </form>
</div>
</div>
  )
}

export default SignIn