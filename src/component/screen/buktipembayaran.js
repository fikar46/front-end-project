import React,{Component} from 'react'
import queryString from 'query-string'
import Axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Bukti extends Component{
    state={
        order:[]
    }
    componentDidMount(){
        var username = cookies.get('dataUser');
        this.getDataOrder(username)
    }
    getDataOrder=(username)=>{
        Axios.post("http://localhost:2000/getOrder",{
            username
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({order:res.data})
            console.log(this.state.order)
        }).catch((err)=>{
            console.log(err)
        })
    }
    postData=()=>{
      var username = cookies.get('dataUser');
      var bank = this.refs.bank.value
      var norek = this.refs.norek.value
      Axios.post("http://localhost:2000/bukti-pembayaran",{
        username, bank, norek
      }).then((res)=>{
          console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
    render(){
        var params = queryString.parse(this.props.location.search)
        var total = params.total;
        return(
                <div className="container mt-5 bg-white mb-5">
                <h1 align="center">Kirim bukti pembayaran</h1>
        <div className="mb-3">
          <label htmlFor="address">Bank yang dituju</label>
          <select class="custom-select d-block w-100" id="bank"  ref="bank" required="">
                  <option value="">Bank pilihan...</option>
                  <option>BCA</option>
                  <option>BRI</option>
                  <option>MANDIRI</option>
                  <option>BNI</option>
          </select>
          
        </div>
        <div className="mb-3">
          <label htmlFor="address2">Nomer Rekening Anda  <span className="text-muted">(sertakan nama banknya)</span></label>
          <input type="text" ref="norek" className="form-control" id="address2" placeholder="Masukan nomor rekening" />
        </div>
        <a href="/">
        <button className="btn btn-primary" onClick={this.postData}>Submit</button>
        </a>
     </div>
        )
    }
}
export default Bukti