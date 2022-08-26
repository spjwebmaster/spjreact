
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../../../Components/Shared/Sidebar"
  import CommunityContent from "../../../Components/Widgets/About/Communities/CommunityContent";
  import Youtube from "../../../Components/Shared/Youtube";
  import Feeds from "../../../Components/Shared/Feeds";

function Community(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const pathname = location.pathname.replace("/","");
    const widgets = props.widget;
    const [communityImage, setCommunityImage] = useState("");

    useEffect(() => {
        // code to run on component mount

        fetch(`/jsonapi/views/communities/block_1?include=field_community_image`)
            .then(response=>response.json())
            .then(data => {

                    let filtered = data.data.filter(t=>t.attributes.field_path==pathname);

                    setData(data.data);
                    setIncluded(data.included)
                    console.log("community", filtered)

                    let item = data.data[0];
                    const mediaId= item.relationships.field_community_image.data.id;
                    const media = data.included.filter(t=>t.id==mediaId);
                    console.log("mdia", media);
                    setCommunityImage(media[0].attributes.uri.url);
               
                    
         })
        
      }, [pathname]);

      let breadData = [];

    return (
        <div>
          
            <div className="row">
                <div className="col-md-9">
                   
                    {(data? 
                        <div>
                            <h1>{data[0].attributes.label}</h1>
                            <div className="row">
                                <div className="col-sm-3">
                                    <figure>
                                    <img src={communityImage} alt={data[0].attributes.label} width="100%" className="block" />
                                    </figure>
                                </div>
                                <div className="col-sm-9">
                                    <div dangerouslySetInnerHTML={{__html: data[0].attributes.field_about_te.value}}></div>
                                </div>
                            </div>
                        </div>:
                        <div></div>
                    )}

                    <hr />
                    <CommunityContent community={pathname} />
                    <Youtube path={location.pathname} />

                    <hr />
                    
                    <div className="row">
                        <div className="col">
                            <Feeds type="JT" path={location.pathname} />
                        </div>
                        <div className="col">
                            <Feeds type="Quill" path={location.pathname} />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Sidebar location={location} menu={props.menu} />
                </div>
            </div>
            

        </div>
    )
}

export default Community;