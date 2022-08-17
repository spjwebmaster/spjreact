
function Bio(props){


    const item = props.item;
    const profileImage = props.profile[0];

    let body = (item.attributes.body ? item.attributes.body.value: "");
    
    return(
        <div>
            <div className="row">
                <div className="col-md-9">

                    
                    <h2>{item.attributes.title}</h2>
                    <strong>{item.attributes.field_title}</strong>
                    <div>
                        
                        {item.relationships.field_role.data.map(role=>{
                            return(
                                <span key={role.id} className="badge bg-info">
                                    Role id: {role.meta.drupal_internal__target_id}
                                </span> 
                                
                            )
                        })}
                        <span>&nbsp;</span>

                        {item.attributes.field_email? 
                            <span className="badge bg-dark">
                                <a href={`mailto:${item.attributes.field_email}`} className="text-white">
                                    {item.attributes.field_email}
                                </a>
                            </span>: ""}

                    <span>&nbsp;</span>
                        {item.attributes.field_phone_number? 
                        <span className="badge bg-warning">
                            {item.attributes.field_phone_number}
                            </span>: ""}
                    </div>

                    <div dangerouslySetInnerHTML={{__html: body}}></div>
                </div>
                <div className="col-md-3">
                
                            {(profileImage? <>
                                <img src={`/sites/default/files/styles/media_library/public/${profileImage.attributes.name}`} className="bio-profile" width="100%" />
                                <br />
                                {profileImage.attributes.name}
                            </> :"")}
                   
                    </div>
            </div>
            <hr />
        </div>
    )
}

export default Bio;