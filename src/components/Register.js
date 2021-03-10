import React, { Component } from 'react';
import { Col, Row, Table } from 'reactstrap';
import hinhanh from '../assets/images/hinhanh.png';
import hinhanh2 from '../assets/images/hinhanh2.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
const BASEURL = 'http://localhost:3000/images/';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRegister: [],
      currentItem:null,
      currentName:null
    }
    this.toggle = this.toggle.bind(this);
  }
  // nút xóa được click
  imageClick = (item) => {
    this.setState({
      currentItem: item.id,
      currentName:item.ten
    });
    this.toggle();
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  delete = () => {
    const { currentItem } = this.state;
    this.toggle();
    fetch('http://192.168.48.1:3000/dangkiphong/' + currentItem, { method: 'DELETE' })
      .then(() => this.setState({ status: 'Delete successful' }));
  }
  // add form duoc click
  addForm = (event) => {
    event.preventDefault();
    this.props.history.push("/dangki")
  }
  // nút sửa  được click
  image2Click = (item) => {
    console.log("id la :", item);
    this.props.history.push("/dangki");
    this.props.history.push({
      pathname: '/dangki',
      state: { currentItem: item }
    })
  }

  componentDidMount() {
    fetch('http://192.168.48.1:3000/dangkiphong', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("List nguoi dang ki:", data);
        this.setState({
          listRegister: data
        })
      });
  }
  render() {
    const { listRegister, currentName } = this.state;
    return (
      <div>
        <h1>Danh sách người đăng kí phòng</h1>
        <div className="canchinh">
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>CMND</th>
                <th>Địa chỉ</th>
                <th>Số phòng</th>
                <th>Ngày đăng kí</th>
                {/* <th>Ngày kết thúc </th> */}
                <th>ID phòng</th>
                <th>Giá phòng</th>
                
                <th>Delete</th>
                <th>Repair</th>
              </tr>
            </thead>
            <tbody>

              {
                listRegister.map((item, index) => {
                  let tienphong=item.dongia;
                  var x="10.333d" ;
                  var a = parseFloat(x)
                  console.log("a:",a);
                  console.log("x :" ,typeof(a));


                  return (
                    <tr>
                      <th>{item.id}</th>
                      <td>{item.ten}</td>
                      <td>{item.sdt}</td>
                      <td>{item.cmnd}</td>
                      <td>{item.diachi}</td>
                      <td>{item.sophong}</td>
                      <td>{moment(item.ngaybatdau).format('DD/MM/YYYY')}</td>
                      {/* <td>{moment(item.ngayketthuc).format('DD/MM/YYYY')}</td> */}
                      <td>{item.idphong}</td>
                      <td>{item.dongia}</td>
                      
                      <td>
                        <img style={{width:"20%"}} src={hinhanh} onClick={() => this.imageClick(item)} />
                      </td>
                      <td>
                        <img style={{width:"20%"}} src={hinhanh2} onClick={() => this.image2Click(item)} />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Bạn có chắc chắn muốn xóa người đăng kí là:{currentName} ?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.delete}>Delete</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default About;