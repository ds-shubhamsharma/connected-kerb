import * as React from "react";


const Link = (props: any) => {

return(<>
 {props.props.linkType=="URL"?
    
        <>
        <Link href={props.props.link}>{props.props.label}</Link>
        </>
    
        :(props.props.linkType=="OTHER")?
        
                <>
                  <Link href={props.props.link} target="_blank">{props.props.label}</Link>
                </>
            
        
        :(props.props.linkType=="PHONE")?
          
                <>
                 <Link href={`tel:${props.props.link}`}>{props.props.label}</Link>
                </>
                  
        :(props.props.linkType=="Email")?
          
                <>
                <Link href={`mailto:${props.props.link}`}>{props.props.label}</Link>
                </>
                :''
           
        
    }
    </>
)
}



export default Link;