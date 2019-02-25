import React,{Component} from 'react'
import queryString from 'query-string'
import Axios from 'axios';

class Payment extends Component{
   
    render(){
        var params = queryString.parse(this.props.location.search)
        var total = params.total;
        return(
                <div className="container mt-5 bg-white mb-5">
                 <h4 className="bg-light p-3 text-dark">Pembayaran via transfer</h4>
                    <div className="payment">
                    <p className="mb-1">Jumlah tagihan:</p>
                    <h3 className="font-weight-bold">{total}</h3>
                    </div>
                    <div className="bg-light">
                    <p className="p-3">Petunjuk pembayaran melalui transfer</p>
                        <div className="bg-white petunjuk row">
                            <div className="col-md-3">
                            <div classname="u-align-center u-mrgn-bottom--2">
                                <img alt="Transfer" src="https://s2.bukalapak.com/images/confirmation_page/atm-1.png" />
                            </div>
                            <div className="u-position-relative">
                                <p className="u-pad-left--3">1. Transfer dapat melalui <b>ATM, SMS / M-Banking,</b> dan <b>E-Banking.</b></p>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div classname="u-align-center u-mrgn-bottom--2">
                                <img alt="Transfer" src="https://s3.bukalapak.com/images/confirmation_page/atm-2.png" />
                            </div>
                            <div className="u-position-relative">
                                <p className="u-pad-left--3">2. Masukkan <b>nomor rekening Warehousenesia.</b></p>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div classname="u-align-center u-mrgn-bottom--2">
                                <img alt="Transfer" src="https://s2.bukalapak.com/images/confirmation_page/atm-3.png" />
                            </div>
                            <div className="u-position-relative">
                                <p className="u-pad-left--3">3. Masukkan <b>jumlah bayar</b> tepat hingga <b>3 digit terakhir.</b></p>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div classname="u-align-center u-mrgn-bottom--2">
                                <img alt="Transfer" src="https://s2.bukalapak.com/images/confirmation_page/atm-4.png" />
                            </div>
                            <div className="u-position-relative">
                                <p className="u-pad-left--3">4. Simpan <b>bukti transfer</b> yang kamu dapatkan.</p>
                            </div>
                            </div>
                        </div>
                        <p className="p-3">Pembayaran dapat dilakukan ke salah satu rekening a/n PT Warehousenesia.id berikut:</p>
                        <div className="row pembayaran-bank">
                            <div className="col-md-6 bg-white">
                            <center className="mt-3">
                            <img alt="Logo Mandiri" src="https://www.bukalapak.com/images/logo-mandiri.gif" style={{height: 32}}/>
                            </center>
                            <p align="center">Mandiri</p>
                            </div>
                            <div className="col-md-6 bg-white">
                            <center className="mt-3">
                            <img alt="Logo BCA" src="https://www.bukalapak.com/images/logo-bca.gif" style={{height: 32}}/>
                            </center>
                            <p align="center">BCA</p>
                            </div>
                            <div className="col-md-6 bg-white">
                            <center className="mt-3">
                            <img alt="Logo BNI" src="https://www.bukalapak.com/images/logo-bni.gif" style={{height: 32}}/>
                            </center>
                            <p align="center">BNI</p>
                            </div>
                            <div className="col-md-6 bg-white">
                            <center className="mt-3">
                            <img alt="Logo BRI" src="https://www.bukalapak.com/images/logo-bri.gif" style={{height: 32}}/>
                            </center>
                            <p align="center">BRI</p>
                            </div>
                            
                        </div>
                        <p align="center" className="p-3 ">Lakukan proses pembayaran untuk dapat melanjutkan proses pesananmu</p>
                        <a href="/bukti-pembayaran">
                        <button className="btn btn-secondary w-100 mb-4">kirim bukti pembayaran</button>
                        </a>
                    </div>

                </div>
        )
    }
}
export default Payment