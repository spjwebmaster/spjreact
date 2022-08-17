import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Banner(){

    let params = useParams();
    let location = useLocation();

    const [data, setData]= useState([])
    const [included, setIncluded]= useState([])
    const [random, setRandom]= useState()

    let imageSuffix = "http://drupal";

    const defaultSliderImages = [
        "/sites/default/files/sliders/2022-02/hero-h-1.jpg",
        "/sites/default/files/sliders/2022-02/hero-h-2.jpg",
        "/sites/default/files/sliders/2022-02/hero-h-3.jpg",
        "/sites/default/files/sliders/2022-02/hero-h-4.jpg",
    ]

    let pagePath = location.pathname;
    let pathSplits = pagePath.split("/");
    
    let testPath = pathSplits[1];
    let isHome = false;
    if(testPath==""){
        testPath="";
        isHome = true;
    }
    let homeClass = (isHome? "homeBanner": "");
    
    useEffect(() => {
        // code to run on component mount
        setRandom(getRandomInt(0,3))
        
            //console.log("banner params",location, "test:", testPath)

            fetch(`/jsonapi/node/slider_slide?filter[field_page_path]=${testPath}&include=field_slider_image`)
                .then(response=>response.json())
                .then(data => {


                    if(data.data.length){
                        setData(data.data)
                    }
                    
                    setIncluded(data.included);

                    
                })

            
        
      }, []);

    return (
        
        <div className={`block-heroimages bg-light ${homeClass} ${pathSplits.join('')}`}>
            {(data.length? 
            
            data.map(dat=>{

                let imageId = dat.relationships.field_slider_image.data.id;
                let imageInfo = included.filter(t=>t.id == imageId);
     
                
                return(
                    
                    <div key={dat.id} className="bannerItem" 
                    style={{backgroundImage: `url(${imageSuffix}${imageInfo[0].attributes.uri.url})`}}>
                        <div className="bannerInner">
                        <div className="bannerContent" dangerouslySetInnerHTML={{__html: (dat.attributes.body? dat.attributes.body.value: "")}}></div>
                        </div>
                    </div>
              
                )
            })
                
            : 
                (random? <div className="mb-4 p-4 text-center" 
                style={{backgroundImage: `url(${imageSuffix}${defaultSliderImages[random]})`}}>
                    Generic
                </div>: <div className="preloadBanner bg-light">Loading</div>)
                
            )}
        </div>
    )
}
export default Banner;