import React from "react";


export default function Sidebar (props){

    console.log("sidebar",props)
    return (
        <aside>
          <h3>Sub Nav</h3>
          <nav className="nav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/about" className="nav-link">
                        About
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/about/staff" className="nav-link">
                        Staff
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/about/foundation" className="nav-link">
                        Foundation
                    </a>
                    <ul>
                        <li>
                            <a href="/about/foundation/sdx-education">Education</a>
                        </li>
                        <li>
                            <a href="/about/foundation/sdx-giving">Planned Giving</a>
                        </li>
                        <li>
                            <a href="/about/foundation/grants">Foundation Grants</a>
                        </li>
                        <li>
                            <a href="/about/foundation/board">Foundation Board</a>
                        </li>
                        <li>
                            <a href="/about/foundation/sdx">Sigma Delta Chi</a>
                        </li>
                        <li>
                            <a href="/about/foundation/nonprofit-disclosures">Disclosures</a>
                        </li>
                    </ul>
                </li>
            </ul>
          </nav>
           
        </aside>
    );

}