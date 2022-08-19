import React, { Component, useState, useEffect } from "react";

function AwardList(props){

    const [alldata, setAlldata] = useState();
    const [included, setIncluded] = useState();
    const view = props.view;


    const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {

          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
    let catList = [];
    useEffect(() => {
        // code to run on component mount

        
            fetch(`/jsonapi/node/award?include=field_award_category`)
                .then(response=>response.json())
                .then(data => {
                    

                    //const groups = groupBy(data.data, 'relationships.field_award_category')
                    //console.log("awards",data.data,groups);
                    setIncluded(data.included);
                    console.log("included", included);
                    let temp = [];
                    data.data.forEach(function(dat){
                        if(dat.relationships.field_award_category.data){
                            let catid = dat.relationships.field_award_category.data.id;
                            let cat= data.included.filter(t=>t.id==catid)
                            let catname = cat[0].attributes.name;
                            let tempDat = dat;
                            tempDat['cat'] = catid;
                            tempDat['catname'] = catname;
                            temp.push(tempDat)
                        } else {
                            console.log("not: ", dat.attributes.title)
                        }
                        
                    })

                    let sortTemp = groupBy(temp, "cat");
                    console.log("sort", sortTemp)

                    setAlldata(sortTemp); 

                    console.log("data for this", sortTemp)
                })

        
      }, []);



    return (
        <div className="faq-list">
        
            
           
                {(alldata? Object.keys(alldata).map(it=> {

                    
                    console.log("looping",alldata[it])

                    let thisCatMeta = included.filter(t=>t.id == it);
                    let catName = thisCatMeta[0].attributes.name;
                    return(

                        <div key={it}>
                            <h2>{catName}</h2>

                        {alldata[it].map(item=> {

                            const catID = (item.relationships.field_award_category.data?item.relationships.field_award_category.data.id: null);
                            const body = (item.attributes.body.summary?item.attributes.body.summary: item.attributes.body.value)
                            const showCat = (!catList.includes(catID)? catID: "");
                            catList.push(catID);
                            console.log(catID, it)
                            return(
                                <div key={item.id}>
                                    <h3>
                                        <a href={item.attributes.field_path}>{item.attributes.title}</a>
                                    </h3>
                                    <div dangerouslySetInnerHTML={{__html: body}}></div>
                                    <hr />
                                </div>
                            )
                        })}
                        </div>
                    )
                    
                }) : <div>loading</div>)} 
         </div>
    )
}

export default AwardList;