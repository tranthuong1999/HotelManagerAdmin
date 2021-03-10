import React, { Component } from 'react';
import { Col, Row, Table } from 'reactstrap';
import hinhanh from '../assets/images/hinhanh.png';
import hinhanh2 from '../assets/images/hinhanh2.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import moment from 'moment';
const BASEURL = 'http://localhost:3000/images/';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPhong: [],
      modal: false,
      currentItem: null,
      currentRoom: "",
    }
    this.toggle = this.toggle.bind(this);
  }
  // nút xóa được click
  imageClick = (item) => {
    this.setState({
      currentItem: item.id,
      currentRoom: item.maphong
    });
    this.toggle();
  }
  delete = () => {
    const { currentItem } = this.state;
    this.toggle();
    fetch('http://192.168.48.1:3000/phong/' + currentItem, { method: 'DELETE' })
      .then(() => this.setState({ status: 'Delete successful' }));
  }
  // add form duoc click
  addForm = (event) => {
    event.preventDefault();
    this.props.history.push("/themphong")
  }
  // nút sửa  được click
  image2Click = (item) => {
    console.log("id la :", item);
    this.props.history.push("/themphong");
    this.props.history.push({
      pathname: '/themphong',
      state: { currentItem: item }
    })
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    fetch('http://192.168.48.1:3000/phong', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log("List nhan vien:",data);
        this.setState({
          listPhong: data
        })
      });
  }
  render() {
    const { listPhong, currentRoom } = this.state;
    var { files } = this.state;
    return (
      <div>
        <h1>Danh sách phòng</h1>
        <div className="form-groupAdd" ><button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={(event) => this.addForm(event)}>Add</button></div>

        <div className="canchinh">
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>id</th>
                <th>Mã Phòng</th>
                <th>Loại phòng</th>
                <th>Diện tích</th>
                <th>Đơn giá</th>
                <th>Ảnh</th>
                <th>Delete</th>
                <th>Repair</th>
              </tr>
            </thead>
            <tbody>

              {
                listPhong.map((item, index) => {
                  console.log("item:", item);
                  files = item.anh.split(",");
                    console.log("File anh :" ,files);
                  return (
                    <tr>
                      <th>{item.id}</th>
                      <td>{item.maphong}</td>
                      <td>{item.loaiphong}</td>
                      <td>{item.dientich}</td>
                      <td>{item.dongia}</td>
                      <td style={{ width: "15%" }}>
                        {files.map((value) => {
                          return <img style={{ width:"35%" }} src={BASEURL + value} />
                        })}
                      </td>
                      <td>
                        <img  style={{width:"20%"}} src={hinhanh} onClick={() => this.imageClick(item)} />
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
            Bạn có chắc chắn muốn xóa mã phòng là:{currentRoom}  không ?
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