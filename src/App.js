import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import themPhong from './components/themPhong';
import Register from './components/Register';
import editRegister from './components/editRegister';





class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h1  className="tieude">Quản lí khách sạn</h1>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/home'} className="nav-link"> Danh sách nhân viên </Link></li>
            <li><Link to={'/contact'} className="nav-link">Thêm nhân viên</Link></li>
            <li><Link to={'/about'} className="nav-link">Danh sách phòng</Link></li>
            <li><Link to={'/themphong'} className="nav-link">Thêm phòng</Link></li>
            <li><Link to={'/register'} className="nav-link">Danh sách người đăng kí phòng</Link></li>
            <li><Link to={'/dangki'} className="nav-link">Đăng kí phòng</Link></li>


            {/* <li><Link to={'/file'} className="nav-link">Up anh</Link></li> */}
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/home' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
              <Route path='/themphong' component={themPhong} />
              <Route path='/register' component={Register} />
              <Route path='/dangki' component={editRegister} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;