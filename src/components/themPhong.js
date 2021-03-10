import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
// import Select from 'react-dropdown-select';
import axios from 'axios';
import Select from 'react-select';


// import axios from 'axios';
const optionLoaiPhong = [
    { value: 'don', label: 'Phòng Đơn' },
    { value: 'doi', label: 'Phòng Đôi' },
];
const optionDienTich = [
    { value: '10', label: '10 m^2' },
    { value: '15', label: '15 m^2' },
    { value: '20', label: '20 m^2' },
];
const optionsDonGia = [
    { value: '100.000 đ', label: '100.000 đ' },
    { value: '200.000 đ', label: '200.000 đ' },
    { value: '250.000 đ', label: '250.000 đ' },

];

const BASEURL = 'http://localhost:3000/images/';
class themPhong extends Component {
    constructor(props) {
        super(props);
        const currentItem = props.location.state?.currentItem;
        // console.log("currentitem in thephong :" ,currentItem.loaiphong);
        const loaiPhongUpdate = optionLoaiPhong.find(e => e.label == currentItem?.loaiphong );
        const dienTichUpdate = optionDienTich.find(e => e.label == currentItem?.dientich );
        const donGiaUpdate = optionsDonGia.find(e => e.label == currentItem?.dongia );
        this.state = {
            maphong: currentItem?.maphong || "",
            loaiphong:  loaiPhongUpdate   ,
            dientich:  dienTichUpdate   ,
            dongia: donGiaUpdate  ,
            maphongError: "",
            loaiphongError: "",
            dientichError: "",
            dongiaError: "",
            fileUpload: null,
            imageRoom: null,
            arrayImage: [],
            selectedOptionLoaiPhong: null,
            selectedOptionDienTich:null,
            selectedOptionDonGia:null
        }
    }

    isChangeMa = (event) => {
        this.setState({
            maphong: event.target.value
        });
    }
    handleChange = selectedOptionLoaiPhong => {
        this.setState(
          { selectedOptionLoaiPhong },
          () => console.log(`Option selected:`, this.state.selectedOptionLoaiPhong)
        );
      };
      isChangeDien = selectedOptionDienTich => {
        this.setState(
          { selectedOptionDienTich },
          () => console.log(`Option selected:`, this.state.selectedOptionDienTich)
        );
      };
      isChangeDon = selectedOptionDonGia => {
        this.setState(
          { selectedOptionDonGia },
          () => console.log(`Option selected:`, this.state.selectedOptionDonGia)
        );
      };
 
    submitForm = (event) => {
        event.preventDefault();
        const currentItem = this.props.location.state?.currentItem;
        const { maphong, selectedOptionLoaiPhong,selectedOptionDienTich,selectedOptionDonGia} = this.state;
        let { arrayImage } = this.state;
        console.log('selectedOptionLoaiPhong la :',selectedOptionLoaiPhong);

        if (maphong.toString().trim().length === 0) {
            this.setState({ maphongError: 'Bạn phải nhập mã phòng' });
            return;
        }
        if (selectedOptionLoaiPhong == null ) {
            this.setState({ loaiphongError: 'Bạn phải nhập loại phòng' });
            return;
        }
        if (selectedOptionDienTich == null ) {
            this.setState({ dientichError: 'Bạn phải nhập diện tích' });
            return;
        }
        if (selectedOptionDonGia  == null) {
            this.setState({ dongiaError: 'Bạn phải nhập đầy đủ đơn giá' });
            return;
        }
        const method = currentItem ? 'PUT' : 'POST';
        const url = currentItem ? ("http://192.168.48.1:3000/phong/" + currentItem.id) : "http://192.168.48.1:3000/phong";
        arrayImage = arrayImage.join(",");
        // console.log("array images :", arrayImage);
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                maphong: maphong,
                loaiphong: selectedOptionLoaiPhong.label,
                dientich:selectedOptionDienTich.label ,
                dongia:selectedOptionDonGia.label,
                anh: arrayImage
            })
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("update success:", data);
                this.props.history.push("/about")
            }).catch((error) => {
                console.error('Error:', error);
            });
    }
    onChangeFile = event => {
        this.setState({ fileUpload: event.target.files[0] });
    }

    onClickUpload(event) {
        event.preventDefault();
        const { fileUpload } = this.state;
        if (fileUpload == null) {
            alert('Bạn phải chọn file');
            return;
        }
        const formData = new FormData();
        formData.append('file', fileUpload); // appending file
        axios.post('http://localhost:3000/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
            }
        }).then(res => {
            const imageReturn = res.data.image;
            console.log("images return :", imageReturn);
            // this.setState({
            //     // imageRoom:imageReturn
            // });
            const { arrayImage } = this.state;
            arrayImage.push(imageReturn);
            this.setState({ arrayImage: arrayImage });

        }).catch(err => console.log('onClickUpload error', err))

    }


    render() {
        const { maphong, loaiphong,  dientich, dongia, maphongError, loaiphongError,
            currentItem, dientichError,  dongiaError, imageRoom, arrayImage } = this.state
       

        return (
            <div>
                <h1> Thêm phòng mới</h1>
                <div className="row" >
                    <div className="col-lg-8 mx-auto">
                        <form id="contactForm" name="sentMessage" noValidate="novalidate">
                            <Row>
                                <Col lg="3">
                                    <label>Mã Phòng:</label>
                                </Col>
                                <Col lg="9">
                                    <input
                                        name="fName"
                                        value={maphong}
                                        onChange={(event) => this.isChangeMa(event)}
                                        placeholder="MaPhong"
                                    />
                                    <p className="help-block text-danger">{maphongError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Loại Phòng:</label>
                                </Col>
                                <Col lg="9">
                                    <Select
                                        value={loaiphong}
                                        onChange={(event) => this.handleChange(event)}
                                        options={optionLoaiPhong}
                                    />
                                    <p className="help-block text-danger">{loaiphongError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            {/* <Row>
                                <Col lg="3">
                                    <label>Số Phòng:</label>
                                </Col>
                                <Col lg="9">
                                    <Select
                                        value={sophong}
                                        onChange={(event) => this.isChangeSo(event)}
                                        options={optionSoPhong}
                                        placeholder="SoPhong"
                                    />
                                    <p className="help-block text-danger">{sophongError}</p>
                                </Col>
                            </Row> */}
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Diện tích:</label>
                                </Col>
                                <Col lg="9">
                                    <Select
                                        value={dientich}
                                        onChange={(event) => this.isChangeDien(event)}
                                        options={optionDienTich}
                                        placeholder="DienTich"
                                    />
                                    <p className="help-block text-danger">{dientichError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            {/* <Row>
                                <Col lg="3">
                                    <label>Tình trạng:</label>
                                </Col>
                                <Col lg="9">
                                    <Select
                                        value={tinhtrang}
                                        onChange={(event) => this.isChangeTinh(event)}
                                        options={optionTinhTrang}
                                        placeholder="TinhTrang"
                                    />
                                    <p className="help-block text-danger">{tinhtrangError}</p>
                                </Col>
                            </Row> */}
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Đơn giá:</label>
                                </Col>
                                <Col lg="9">
                                    <Select
                                        value={dongia}
                                        onChange={(event) => this.isChangeDon(event)}
                                        options={optionsDonGia}
                                        placeholder="Dongia"
                                    />
                                    <p className="help-block text-danger">{dongiaError}</p>
                                </Col>
                            </Row>
                            {/*  */}
                            <Row>
                                <Col lg="3">
                                    <label>Ảnh minh họa:</label>
                                </Col>
                                <Col lg="9">
                                    {
                                        arrayImage.map((e, index) => {
                                            // return <img style={{ width: 100}} src={BASEURL + e} />
                                            return <img style={{ width: 100 }} src={BASEURL + e} />

                                        })
                                    }

                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">

                                </Col>
                                <Col lg="9" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="file" name="file" onChange={this.onChangeFile} />
                                    <button className="upbutton"
                                        onClick={(event) => {
                                            this.onClickUpload(event);
                                        }}>
                                        Upload
                                    </button>
                                </Col>
                            </Row>
                            <div className="form-group" ><button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={(event) => this.submitForm(event)}>Send</button></div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default themPhong;