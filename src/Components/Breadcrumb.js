
function Breadcrumb(props){

    return (
        <nav className="navbar breadcrumb bg-light me-auto mb-2 mb-lg-0">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/" className="nav-link disabled">Current</a>
                </li>
            </ul>
        </nav>
    )

}

export default Breadcrumb;