import React, { Component } from 'react';
import { Col, Row, Table } from 'reactstrap';
import hinhanh from '../assets/images/hinhanh.png';
import hinhanh2 from '../assets/images/hinhanh2.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNhanVien: [],
      modal: false,
      currentItem:null,
      currentName:[],
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  addForm = (event) => {
    event.preventDefault();
    this.props.history.push("/contact")
  }

  //  componentWillMount(){
  //   console.log("Will mount");
  //  }   

  componentDidMount() {
    fetch('http://192.168.48.1:3000/nhanvien', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log("List nhan vien:",data);
        this.setState({
          listNhanVien: data
        })
      });
  }
  // nút xóa được click
  imageClick = (item) => {
    this.setState({ 
      currentItem: item.id,
      currentName:item.tennv
    });
    this.toggle();
  }  
  delete = () => {
    const {currentItem} = this.state;
    this.toggle();
    fetch('http://192.168.48.1:3000/nhanvien/' + currentItem, { method: 'DELETE' })
    .then(() => this.setState({ status: 'Delete successful' }));
  }
  // nút sửa  được click
  image2Click =(item) =>{
    console.log("id la :" ,item);
    this.props.history.push("/contact");
    this.props.history.push({
      pathname: '/contact',
      state: { currentItem: item }
    })
  }


  render() {
    // console.log("Render list nhan vien:", this.state.listNhanVien);
    // const {currentItem} =this.state;
    const { listNhanVien,currentName} = this.state;
    return (
      <div>
        <h1>Danh sách nhân viên</h1>
    <div className="form-groupAdd" ><button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={(event) => this.addForm(event)}>Add</button></div>

        <div className="canchinh">
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>id</th>
                <th>MaNV</th>
                <th>TenNV</th>
                <th>NgaySinh</th>
                <th>GioiTinh</th>
                <th>DiaChi</th>
                <th>CNND</th>
                <th>ChucVu</th>
                <th>MaBoPhan</th>
                <th>NgayVaoLam</th>
                <th>Luong</th>
                <th>SDT</th>
                <th>Delete</th>
                <th>Repair</th>
              </tr>
            </thead>
            <tbody>

              {
                listNhanVien.map((item, index) => {
                  return (
                    <tr>
                      <th>{item.id}</th>
                      <td>{item.manv}</td>
                      <td>{item.tennv}</td>
                      <td>{moment(item.ngaysinh).format('DD/MM/YYYY')}</td>
                      <td>{item.gioitinh}</td>
                      <td>{item.diachi}</td>
                      <td>{item.cmnd}</td>
                      <td>{item.chucvu}</td>
                      <td>{item.mabophan}</td>
                      <td>{moment(item.ngaysinh).format('DD/MM/YYYY')}</td>
                      <td>{item.luong}</td>
                      <td>{item.sdt}</td>
                       <td>
                       {/* <img src={hinhanh} onClick={() => this.imageClick(item)} /> */}
                       <img src={hinhanh} onClick={() => this.imageClick(item)} />
                      </td>
                      <td>
                       <img src={hinhanh2} onClick={() => this.image2Click(item)} />
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
             Bạn có chắc chắn muốn xóa TenNV là:{currentName} không ?
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
export default Home;