import React, { Component, useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

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
    const [randomImage, setRandomImage] = useState("");

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
        

            let thisPath = pagePath;
            if(thisPath==""||thisPath=="/"){
                thisPath="home";
            }
            let bannerURL = `/api/bannerjson?path=${thisPath}`;
            fetch(bannerURL)
                .then(response=>response.json())
                .then(data => {

                    
                    setData(data.data);


                    if(data.data.length==1){
                        if(randomImage==""){
                            setRandomImage(data.data[0].image);
                        }
                    }

                })



            /*
            fetch(`/jsonapi/node/slider_slide?filter[field_page_path]=${testPath}&include=field_slider_image`)
                .then(response=>response.json())
                .then(data => {


                    if(data.data.length){
                        setData(data.data)
                    }
                    
                    setIncluded(data.included);

                    
                })
                */

            
        
      }, []);

    return (
        
        <div className={`block-heroimages bg-light ${homeClass} ${pathSplits.join('')}`}>

  
            {(data? <div className="swiperwrap">
                {(data.length>1 ? 


                    <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    >
                        {data.map(item=>{


                            return (

                                <SwiperSlide key={item.id} className="bannerItem" style={{backgroundImage: `url(${item.image})`}}>
                                    {item.image}
                                </SwiperSlide>

                                
                            )

                        
                        })}
                    </Swiper>
                    : <div>
                        {(data[0]? 
                        <div className="bannerItem" 
                            style={{backgroundImage: `url(${(data[0].image ? data[0].image: "none")})`}}>
                            <div className="bannerInner">
                                <div className="bannerContent" 
                                    dangerouslySetInnerHTML={{__html: (data[0].body? data[0].body: "")}}>

                                </div>
                            </div>
                        </div>

                        : <div>Loading</div>)}
                    </div>

                )}
                
                </div>: 

           "loading")}

            {/*
            (data.length? 
            
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
                
        )*/}
        </div>
    )
}
export default Banner;