function navbar() {
    return (
        <header className="topbar" style={{zIndex: 1000}}>
            <nav className="navbar top-navbar navbar-toggleable-sm navbar-light">
                <div className="navbar-header">
                    <a className="navbar-brand" href="">
                        <img src="assets/images/logo-light-icon.png" alt="homepage" className="d-sm-inline d-md-inline d-lg-none light-logo mx-1" style={{ width: "40px" }} />
                        <img src="assets/images/logo-light-text.png" className="d-none d-sm-none d-lg-inline light-logo" alt="homepage" style={{ width: "150px" }} />
                    </a>
                </div>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto mt-md-0">
                        <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i className="mdi mdi-menu" /></a> </li>
                    </ul>
                    <ul className="navbar-nav ml-auto my-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                MAN 4 Jombang
                            </a>
                            {/* <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Wellcome
                            </a> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default navbar
