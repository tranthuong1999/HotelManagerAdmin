import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from "reactstrap";
import moment from 'moment';
import DatePicker from "react-datepicker";

const optionsGioiTinh = [
  { value: 'nam', label: 'Nam' },
  { value: 'nu', label: 'Nữ' },
];
class Contact extends Component {
  constructor(props) {
    super(props);
    console.log("Contact props:", props);
    const currentItem = props.location.state?.currentItem;
    console.log("Contact currentItem:", currentItem);
    const gioiTinhUpdate = optionsGioiTinh.find(e => e.value ==currentItem?.gioitinh );

    this.state = {
      tennv: currentItem?.tennv || '',
      manv: currentItem?.manv || '',
      ngaysinhDate: new Date() || currentItem?.ngaysinh ,
      gioitinh:  gioiTinhUpdate ,
      diachi: currentItem?.diachi || '',
      cmnd: currentItem?.cmnd || '',
      chucvu: currentItem?.chucvu || '',
      bophan: currentItem?.mabophan || '',
      ngayvaolam:new Date() || currentItem?.ngayvaolam ,
      luong: currentItem?.luong || '',
      sdt: currentItem?.sdt || '',
      tenNvError: '',
      maNvError: '',
      ngaySinhError: '',
      gioiTinhError: '',
      diaChiError: '',
      cmndError: '',
      chucVuError: '',
      boPhanError: '',
      ngayVaoLamError: '',
      luongError: '',
      sdtError: '',
      currentSex:null,
      currentSexError: '',
      selectedOption:null
    }
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  isChangeName = (event) => {
    this.setState({
      tennv: event.target.value
    });
  }
  isChangeMa = (event) => {
    this.setState({
      manv: event.target.value
    });
  }
  // isChangeNgay = (event) => {
  //   this.setState({
  //     ngaysinh: event.target.value
  //   });
  // }
  isChangeDia = (event) => {
    this.setState({
      diachi: event.target.value
    });
  }

  isChangeCM = (event) => {
    this.setState({
      cmnd: event.target.value
    });
  }
  isChangeChuc = (event) => {

    this.setState({
      chucvu: event.target.value
    });
  }
  isChangeBoPhan = (event) => {
    this.setState({
      bophan: event.target.value
    });
  }
  isChangeLam = (event) => {

    this.setState({
      ngayvaolam: event.target.value
    });
  }
  isChangeLuong = (event) => {

    this.setState({
      luong: event.target.value
    });
  }
  isChangeSdt = (event) => {

    this.setState({
      sdt: event.target.value
    });
  }
  // nguoi lam mau
  submitForm = (event) => {
    event.preventDefault();
    const currentItem = this.props.location.state?.currentItem;
    const { tennv, manv, ngaysinhDate,selectedOption, diachi, cmnd, chucvu, bophan, ngayvaolam, luong, sdt, currentSex } = this.state;
    if (tennv.trim().length === 0) {
      this.setState({ tenNvError: 'Bạn phải nhập đầy đủ tên' });
      return;
    }
    if (manv.trim().length === 0) {
      this.setState({
        maNvError: 'ban phai nhap ma nhan vien'
      });
      return;
    }
    // if (ngaysinh.trim().length === 0) {
    //   this.setState({
    //     ngaySinhError: 'ban phai nhap ngay sinh'
    //   });
    //   return;
    // }
    if (currentSex == null) {
      this.setState({
        currentSexError: "ban phai chon gioi tinh"
      });
      return;
    }
    if (diachi.trim().length === 0) {
      this.setState({
        diaChiError: 'ban phai nhap lai dia chi'
      });
      return;
    }
    console.log("chung minh: " ,cmnd);
    if (cmnd.toString().trim().length === 0) {
      this.setState({
        cmndError: 'ban phai nhap cmnd'
      });
      return;
    }
    if (chucvu.trim().length === 0) {
      this.setState({
        maNvError: 'ban phai nhap chuc  vu'
      });
      return;
    }
    if (bophan.trim().length === 0) {
      this.setState({
        boPhanError: 'ban phai nhap ma bo phan'
      });
      return;
    }
    if (ngayvaolam.trim().length === 0) {
      this.setState({
        ngayVaoLamError: 'ban phai nhap ngay vao lam'
      });
      return;
    }
    if (luong.toString().trim().length === 0) {
      this.setState({
        luongError: 'ban phai nhap luong'
      });
      return;
    }
    if (sdt.toString().trim().length == 0) {
      this.setState({
        sdtError: 'ban phai nhap lai sdt'
      });
      return;
    }

    const method = currentItem ? 'PUT' : 'POST';
    const url = currentItem ? ("http://192.168.48.1:3000/nhanvien/" + currentItem.id) : "http://192.168.48.1:3000/nhanvien";

    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        manv: manv,
        tennv: tennv,
        ngaysinh: ngaysinhDate,
        gioitinh:selectedOption.label,
        diachi: diachi,
        cmnd: cmnd,
        chucvu: chucvu,
        mabophan: bophan,
        ngayvaolam: ngaysinhDate,
        luong: luong,
        sdt: sdt
      })
    };
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("update success:", data);
        this.props.history.push("/home")
      }).catch((error) => {
        console.error('Error:', error);
      });
    // if (currentItem) {
    //   //update du lieu
    //   const requestOptions = {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       manv: manv,
    //       tennv: tennv,
    //       ngaysinh: ngaysinhDate,
    //       gioitinh:currentSex.label,
    //       diachi: diachi,
    //       cmnd: cmnd,
    //       chucvu: chucvu,
    //       mabophan: bophan,
    //       ngayvaolam: ngayvaolam,
    //       luong: luong,
    //       sdt: sdt
    //     })
    //   };
    //   const url = "http://192.168.48.1:3000/nhanvien/" + currentItem.id;
    //   fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log("update success:", data);
    //       this.props.history.push("/home")
    //     }).catch((error) => {
    //       console.error('Error:', error);
    //     });
    // } else {
    //   //them moi
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       manv: manv,
    //       tennv: tennv,
    //       ngaysinh: ngaysinhDate,
    //       gioitinh: currentSex.label,
    //       diachi: diachi,
    //       cmnd: cmnd,
    //       chucvu: chucvu,
    //       mabophan: bophan,
    //       ngayvaolam: ngayvaolam,
    //       luong: luong,
    //       sdt: sdt
    //     })
    //   };
    //   //them moi du lieu 
    //   fetch('http://192.168.48.1:3000/nhanvien', requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log("data:", data);
    //       this.props.history.push("/home")
    //     }).catch((error) => {
    //       console.error('Error:', error);
    //     });
    // }
  }
  render() {
    const { tennv, manv, diachi, cmnd, chucvu, bophan, ngayvaolam, luong, sdt,
      tenNvError, maNvError,  diaChiError, chucVuError, boPhanError,
      ngayVaoLamError, luongError, sdtError,gioitinh, cmndError, currentSex, currentSexError,
      ngaysinhDate
    } = this.state;
    return (
      <div>
        <h1>Thêm nhân viên mới</h1>
        <div className="row" >
          <div className="col-lg-8 mx-auto">
            <form id="contactForm" name="sentMessage" noValidate="novalidate">
              <Row>
                <Col lg="3">
                  <label>Tên nhân viên:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fName"
                    value={tennv}
                    onChange={(event) => this.isChangeName(event)}
                    placeholder="Name"
                  />
                  <p className="help-block text-danger">{tenNvError}</p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Mã nhân viên:</label>
                </Col>
                <Col lg="9">
                  <input name="fMa"
                    value={manv}
                    onChange={(event) => this.isChangeMa(event)}
                    placeholder="MaNhanVien"
                  />
                  <p className="help-block text-danger" > {maNvError}</p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Ngày sinh:</label>
                </Col>
                <Col lg="9">
                    <DatePicker 
                      selected={ngaysinhDate} 
                      onChange={date =>{
                        // console.log("date selected:", date.toString());
                        const dateString = moment(date).format('YYYY/MM/DD');
                        console.log("date dateString:", dateString);
                        this.setState({ 
                          ngaysinhDate: date
                        })
                      }}
                    />
                  {/* <p className="help-block text-danger" > {ngaySinhError}</p> */}
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Giới tính:</label>
                </Col>
                <Col lg="9">
                  <Select
                    value={gioitinh}
                    onChange={(event) => this.handleChange(event)}
                    options={optionsGioiTinh}
                  />
                  <p className="help-block text-danger" > {currentSexError}</p>

                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Địa chỉ:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fDia"
                    value={diachi}
                    onChange={(event) => this.isChangeDia(event)}
                    placeholder="DiaChi"
                  />
                  <p className="help-block text-danger" >{diaChiError} </p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>CMND:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fCm"
                    value={cmnd}
                    onChange={(event) => this.isChangeCM(event)}
                    placeholder="CMND"
                  />
                  <p className="help-block text-danger" >{cmndError}</p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Chức vụ:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fChuc"
                    value={chucvu}
                    onChange={(event) => this.isChangeChuc(event)}
                    placeholder="ChucVu"
                  />
                   <p className="help-block text-danger" >{chucVuError}</p>
                </Col>

              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Mã bộ phận:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fBo"
                    value={bophan}
                    onChange={(event) => this.isChangeBoPhan(event)}
                    placeholder="MaBoPhan"
                  />
                  <p className="help-block text-danger" >{boPhanError}</p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Ngày vào làm:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fLam"
                    value={ngayvaolam}
                    onChange={(event) => this.isChangeLam(event)}
                    placeholder="Que Quan"
                  />
                  <p className="help-block text-danger" > {ngayVaoLamError}</p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>Lương:</label>
                </Col>
                <Col lg="9">
                  <input
                    name="fLuong"
                    value={luong}
                    onChange={(event) => this.isChangeLuong(event)}
                    placeholder="Luong"
                  />
                  <p className="help-block text-danger">{luongError} </p>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col lg="3">
                  <label>SDT:</label>
                </Col>
                <Col lg="9">
                  <input name="fSo"
                    value={sdt}
                    onChange={(event) => this.isChangeSdt(event)}
                    placeholder="Sdt" />
                  <p className="help-block text-danger"> {sdtError}</p>
                </Col>
              </Row>
              <br />
              <div id="success" />
              <div className="form-group" ><button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={(event) => this.submitForm(event)}>Send</button></div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Contact;