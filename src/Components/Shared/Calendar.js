import React, { Component, useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import XMLParser from 'react-xml-parser';

export default function Calendar(props){
const [data, setData] = useState();
    const [events, setEvents] = useState([]);
    const [view, setView] = useState("calendar");
    const path = "all"
    useEffect(() => {
        // code to run on component mount
            let calendareventsurl = "https://calendar.spjnetwork.org/feed.php?ex=";

            fetch(calendareventsurl)
                .then(res => res.text())
                .then(data => {
                    var xml = new XMLParser().parseFromString(data); 
                    let eventTemp = [];
                    //console.log("xml",xml.children[0].children);
                    xml.children[0].children.forEach(element => {
                        
                        if(element.name=="item"){
                            let temp = {};
                            console.log(element);
                            element.children.forEach(prop => {
                                temp[prop.name] = prop.value;
                            })
                            temp["start"] = new Date(temp.eventstart + " " + temp.eventstarttime);
                            temp["end"] = new Date(temp.eventend  + " " + temp.eventendtime);
                            temp["url"] = temp.link;

                            eventTemp.push(temp);
                        }
                        
                    });
                    setEvents(eventTemp);
                    console.log("event temp",eventTemp)
                })
                .catch(err => console.log(err));


            fetch(`/calendarjson/${path}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("events old", data)
                    setData(data.data)
                })
        
      }, []);


    return(
        <div>
           
         
           {(events.length>0? <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                eventClick={e => handleDateClick(e)}
                events={events}/> : "")}

            <hr />
           {(events? <div>
                    <ul className="widget-list">
                    {events.map(cal=>{

                        let title = (cal.title);
                        

                        return(
                            <li key={cal.link}>
                                <h4>{cal.eventstart}</h4>
                                <h3><a href={cal.link} target="_blank">
                                    {title}
                                    </a>
                                    </h3>
                                    <div dangerouslySetInnerHTML={{__html: cal.description}} ></div>
                                    <hr />
                            </li>
                        )
                    })}
                    </ul>


                </div> : <div>Loading</div>)}
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  function handleDateClick(e){
    console.log(e);
    e.jsEvent.preventDefault();
    console.log(e.event);
    let link = e.event.url;
    if(link){
        window.open(link)
    }
  }
