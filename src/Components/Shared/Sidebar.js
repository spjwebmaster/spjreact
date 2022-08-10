
import React, { Component, useState, useEffect } from "react";

export default function Sidebar (props){


    const [submenus, setSubmenus] = useState([]);
    const path = props.location.pathname;
    const menu = props.menu;
    console.log("path", path)
    console.log("sidebar", menu, path)
    
    useEffect(() => {
        // code to run on component mount
        if(props.menu &&props.menu.length){

        
        let thismenu = props.menu.filter(t=>t.attributes.url == path);
        
        let active = (thismenu.length? thismenu[0].attributes.title: "");
        let splits = path.split("/");
        
        let whichLevel = "";
        for(let i=1; i<splits.length; i++){
            whichLevel += splits[i];
            if(i == splits.length-1){

            } else {
                whichLevel += "/"; 
            }
        }


        console.log("sidebar splits", splits,  whichLevel, "|", splits[(splits.length-1)])
        let base = menu.filter(t=>t.attributes.url == "/" + whichLevel);
        if(base){
        let baseId = base[0].id;
        console.log("base id", baseId)

        console.log("getting ", "/" + whichLevel, base, menu)
        if(base.length){
            
    
            let submenus = menu.filter(function(m){ return m.attributes.parent==baseId})
            setSubmenus(submenus);
    
            console.log("sidebar",submenus);
            submenus.forEach(function(el){
                console.log(el.attributes.url)
            })
        }
        }
        }
        
      }, [props.menu]);
    


   
    return (
        <aside>
          <h3>Sub Nav</h3>
          <nav className="nav-side">
            
            
          {submenus? <ul className='navbar-nav'>
                {submenus.map(s=>{

                    let activeClass= (s.attributes.url==path? "active": "");
                    return(
                        <li key={s.id} className={`nav-item ${activeClass}`}>
                            <a href={s.attributes.url} className={`nav-link ${activeClass}`}>
                                {s.attributes.title}
                            </a>
                        </li>
                    )
                })}
            </ul> : ""}
            
            
          
            
          </nav>
           
        </aside>
    );

}