import React from 'react';
import './signIn.css';

export class SignIn extends React.Component{

  render(){
    let list=[1,2,3,4,5]
    return(
      // <div>
      //   {list.map(item=>(
      //     <div key={item} className="make-center beautify">
      //       Hello World!
      //     </div>
      //   ))}
      // </div>
      <div>
        {list.map(item=>(
          <div key={item} style={{display:'flex',justifyContent:'center',alignItems:'center',background:'royalblue',color:'white',height:'20vh',marginBottom:'2px'}}>This is Inline Style Examle!</div>
        ))}
      </div>
    )
  }
}