import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from "react-datepicker";
const BASEURL = 'http://localhost:3000/images/';
class themPhong extends Component {
    constructor(props) {
        super(props);
        const currentItem = props.location.state?.currentItem;
        console.log("Register truyen sang la :", currentItem);
        this.state = {
            ten: currentItem?.ten || '',
            sdt: currentItem?.sdt || '',
            cmnd: currentItem?.cmnd || '',
            diachi: currentItem?.diachi || '',
            sophong: currentItem?.sophong || '',
            ngaybatdau: new Date() || currentItem?.ngaybatdau,
            ngayketthuc: new Date() || currentItem?.ngayketthuc,
            idphong: currentItem?.idphong || '',
            dongia: currentItem?.dongia || '',
            sotien: currentItem?.sotien || '',

        }
    }

    isChangeTen = (event) => {
        this.setState({
            ten: event.target.value
        });
    }
    isChangeSdt = (event) => {
        this.setState({
            sdt: event.target.value
        });
    }
    isChangeCmnd = (event) => {
        this.setState({
            cmnd: event.target.value
        });
    }
    isChangeDiachi = (event) => {
        this.setState({
            diachi: event.target.value
        });
    }
    isChangeSoPhong = (event) => {
        this.setState({
            sophong: event.target.value
        });
    }
    // isChangeNgay = (event) => {
    //     this.setState({
    //         ngaydangki: event.target.value
    //     });
    // }
    isChangeIdPhong = (event) => {
        this.setState({
            idphong: event.target.value
        });
    }
    isChangeDonGia = (event) => {
        this.setState({
            dongia: event.target.value
        });
    }
    // isChangeSoTien = (event) => {
    //     this.setState({
    //         sotien: event.target.value
    //     });
    // }


    submitForm = (event) => {
        event.preventDefault();
        const currentItem = this.props.location.state?.currentItem;
        const { ten, sdt, cmnd, ngaybatdau, ngayketthuc, diachi, sophong, ngaydangki, idphong, dongia, sotien } = this.state;

        if (ten.toString().trim().length === 0) {
            this.setState({ tenError: 'Bạn phải nhập tên' });
            return;
        }
        if (sdt.toString().trim().length === 0) {
            this.setState({ sdtError: 'Bạn phải nhập sdt' });
            return;
        }
        if (cmnd.toString().trim().length === 0) {
            this.setState({ cmndError: 'Bạn phải nhập số cmnd' });
            return;
        }
        if (diachi.toString().trim().length === 0) {
            this.setState({ diachiError: 'Bạn phải nhập địa chỉ' });
            return;
        }
        if (sophong.toString().trim().length === 0) {
            this.setState({ soPhongError: 'Bạn phải nhập số phòng' });
            return;
        }
        if (ngaybatdau.trim().length === 0) {
            this.setState({ ngayError: 'Bạn phải nhập ngày' });
            return;
        }
        if (idphong.toString().trim().length === 0) {
            this.setState({ idPhongError: 'Bạn phải nhập id phòng' });
            return;
        }
        if (dongia.toString().trim().length === 0) {
            this.setState({ donGiaError: 'Bạn phải nhập đơn giá' });
            return;
        }
        // if (sotien.toString().trim().length === 0) {
        //     this.setState({ soTienError: 'Bạn phải nhập số tiền' });
        //     return;
        // }
        const method = currentItem ? 'PUT' : 'POST';
        const url = currentItem ? ("http://192.168.48.1:3000/dangkiphong/" + currentItem.id) : "http://192.168.48.1:3000/dangkiphong";
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ten: ten,
                sdt: sdt,
                cmnd: cmnd,
                diachi: diachi,
                sophong: sophong,
                ngaybatdau: ngaybatdau,
                ngayketthuc: ngayketthuc,
                idphong: idphong,
                dongia: dongia,
                // sotien: sotien,
            })
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("update success:", data);
                this.props.history.push("/register")
            }).catch((error) => {
                console.error('Error:', error);
            });
    }


    render() {
        const { ten, sdt, cmnd, diachi, sophong, ngaybatdau, ngayketthuc, idphong, dongia, sotien } = this.state
        const { tenError, sdtError, diachiError, cmndError, soPhongError, ngayError, idPhongError, donGiaError, soTienError } = this.state
        return (
            <div>
                <h1> Đăng kí phòng</h1>
                <div className="row" >
                    <div className="col-lg-8 mx-auto">
                        <form id="contactForm" name="sentMessage" noValidate="novalidate">
                            <Row>
                                <Col lg="3">
                                    <label>Ten:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={ten}
                                        onChange={(event) => this.isChangeTen(event)}
                                        placeholder="Ten"
                                    />
                                    <p className="help-block text-danger">{tenError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Sdt:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={sdt}
                                        onChange={(event) => this.isChangeSdt(event)}
                                        placeholder="SDT"
                                    />
                                    <p className="help-block text-danger">{sdtError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Cmnd:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={cmnd}
                                        onChange={(event) => this.isChangeCmnd(event)}
                                        placeholder="CMND"
                                    />
                                    <p className="help-block text-danger">{cmndError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Dia chi:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={diachi}
                                        onChange={(event) => this.isChangeDiachi(event)}
                                        placeholder="dia chi"
                                    />
                                    <p className="help-block text-danger">{diachiError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Số phòng:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={sophong}
                                        onChange={(event) => this.isChangeSoPhong(event)}
                                        placeholder="so phong"
                                    />
                                    <p className="help-block text-danger">{soPhongError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row style={{ width: "97%", marginLeft: 15 }}>
                                <Col lg="3">
                                    <label style={{ marginLeft: -33 }}>Ngày đăng kí:</label>
                                </Col>
                                <DatePicker style={{ width: "132%" }}
                                    selected={ngaybatdau}
                                    onChange={date => {
                                        // console.log("date selected:", date.toString());
                                        const dateString = moment(date).format('YYYY/MM/DD');
                                        console.log("date dateString:", dateString);
                                        this.setState({
                                            ngaybatdau: date
                                        })
                                    }}
                                />
                            </Row>
                            {/*  */}
                            <Row style={{ width: "97%", marginLeft: 15 }}>
                                <Col lg="3">
                                    <label style={{ marginLeft: -33 }}>Ngày kết thúc:</label>
                                </Col>
                                <DatePicker style={{ width: "132%" }}
                                    selected={ngayketthuc}
                                    onChange={date => {
                                        // console.log("date selected:", date.toString());
                                        const dateString = moment(date).format('YYYY/MM/DD');
                                        console.log("date dateString:", dateString);
                                        this.setState({
                                            ngayketthuc: date
                                        })
                                    }}
                                />
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Id phong:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={idphong}
                                        onChange={(event) => this.isChangeIdPhong(event)}
                                        placeholder="id phong"
                                    />
                                    <p className="help-block text-danger">{idPhongError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Giá phòng:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={dongia}
                                        onChange={(event) => this.isChangeDonGia(event)}
                                        placeholder="giaphong"
                                    />
                                    <p className="help-block text-danger">{donGiaError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            {/* <Row>
                                <Col lg="3">
                                    <label>Tổng tiền:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={sotien}
                                        onChange={(event) => this.isChangeSoTien(event)}
                                        placeholder="tong tien"
                                    />
                                    <p className="help-block text-danger">{soTienError}</p>
                                </Col>
                            </Row> */}



                            <div className="form-group" ><button className="btn btn-primary btn-xl" style={{ marginLeft: "50%" }} id="sendMessageButton" type="submit" onClick={(event) => this.submitForm(event)}>Send</button></div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default themPhong;