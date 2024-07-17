import React from 'react'

function SignUp() {
  return (
    <div><div className="wrapper">
    
    

    {/*Forms*/}
    <form className="form" action = "#" method = "POST">
        <fieldset className="fldt">
            <div className="form-header">
                <h2> Sign Up for MaidMatch </h2>
            </div>
        
            <div className="form-name">
                <div className = "name-group1">
                    <label for="first"> First Name</label>
                    <input type="text" id="first" placeholder = "First Name"/>
                </div>
                <div className = "name-group2">
                    <label for="last">Last Name</label>
                    <input type="text" id="last" placeholder = "Last Name"/>
                </div>
                
            </div>
            <div className="form-boxes">
                
                <label for="email">Email</label>
                <input type="text" id="email" placeholder = "Email"/>
                
            </div>
            <div className="form-boxes">
                
                <label for="number">Number</label>
                <input type="text" id="number" placeholder = "Number"/>

            </div>
            <div className="form-boxes">
                
                <label for="address">Address</label>
                <input type="text" id="address" placeholder = "Address"/>
            
            </div>
            <div className="form-boxes">
                
                <label for="password">Password</label>
                <input type="password" id = "password" placeholder = "Password"/>
            </div>
            
            <div className="btn">
                <button role="button" className="form-sbmt-btn">Register!</button>
                
            </div>
            
        </fieldset> 
            
        

    



    </form>
</div>
</div>
  )
}

export default SignUp