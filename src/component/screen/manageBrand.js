import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect}from 'react-router-dom';
class AdminInputProduk extends Component{
    state= {
        listProduk: [],
        listKategori: [],
        listCountry: [],
        selectedEdit:0
    };
    componentDidMount(){
        this.getProdukList();
        this.getKategoriList()
        this.getCountryList()
    }
    getProdukList=()=>{
        axios.get('http://localhost:2000/get-produk')
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data, selectedEdit:0})
        }).catch((err)=>{
            console.log(err)
        })
    }
    getCountryList=()=>{
        axios.get('http://localhost:2000/get-country')
        .then((data)=> {
            console.log(data.data)
            this.setState({listCountry:data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataCountry=()=>{
        var kategori = this.state.listCountry.map((item)=>{
            return(
                <option value={item.id}>{item.nama}</option>
            )
        })
        return kategori
    }
    getKategoriList=()=>{
        axios.get('http://localhost:2000/get-kategori')
        .then((data)=> {
            console.log(data.data)
            this.setState({listKategori:data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataKategori=()=>{
        var kategori = this.state.listKategori.map((item)=>{
            return(
                <option value={item.id}>{item.nama_kategori}</option>
            )
        })
        return kategori
    }
    onBtnAddClick=()=>{
        var nama = this.refs.namaAdd.value;
        var harga = this.refs.hargaAdd.value;
        var deskripsi= this.refs.descAdd.value;
        var country= this.refs.countryAdd.value;
        var kategori= this.refs.kategoriAdd.value;
        // var image = this.refs.imageAdd.value;
        // var image2 = this.refs.imageAdd2.value;
        // var image3 = this.refs.imageAdd3.value;
        axios.post("http://localhost:2000/add-product",{
            nama,harga,deskripsi,country,kategori
        }).then((res)=>{
            console.log(res)
            this.getProdukList()
        }).catch((err)=>{
            console.log(err)
        })

    }
    onBtnEditClick=(id)=>{
        var nama = this.refs.namaEdit.value;
        var harga = this.refs.hargaEdit.value;
        var deskripsi = this.refs.descEdit.value;
        var country= this.refs.countryEdit.value;
        var kategori= this.refs.kategoriEdit.value;
        // var image = this.refs.imageEdit.value;
        // var image2 = this.refs.imageEdit2.value;
        // var image3 = this.refs.imageEdit3.value;
        axios.post("http://localhost:2000/edit-product/"+id,{
            nama,harga,deskripsi,country,kategori
        }).then((res)=>{
            console.log(res)
            this.getProdukList()
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnDeleteClick=(id)=>{
        if(window.confirm('Apakah anda yakin ingin menghapusnya?')){
            axios.post('http://localhost:2000/delete-product/'+id)
            .then((res)=>{
                this.getProdukList();
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    onBtnAddImageClick=(id)=>{
        axios.post('http://localhost:2000/add-product-image',{
            id_produk:id, gambar1:'',gambar2:'',gambar3:''
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    renderListProduk = ()=>{
        var listJSXProduk = this.state.listProduk.map((item)=>{
            if(item.id !== this.state.selectedEdit){
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.harga}</td>
                        <td>{item.deskripsi}</td>
                        <td>{item.country}</td>
                        <td>{item.kategori}</td>
                        {/* <td><img src={item.gambar1} alt='img' className='image-admin'/> </td>
                        <td><img src={item.gambar2} alt='img' className='image-admin'/> </td>
                        <td><img src={item.gambar3} alt='img' className='image-admin'/> </td> */}
                        <td><input onClick={()=> this.setState({selectedEdit: item.id})} type="button" value="Edit" className="btn btn-primary"/></td>
                        <td><a href="/manage-image-product"><input onClick={()=> this.onBtnAddImageClick(item.id)} type="button" value="Add Image" className="btn btn-danger"/></a></td>
                        <td><input onClick={()=> this.onBtnDeleteClick(item.id)} type="button" value="Delete" className="btn btn-danger"/></td>
                        
                    </tr>
                    )
            }
            return(
                <tr>
                    <td>{item.id}</td>
                    <td><input type="text" defaultValue={item.nama} ref="namaEdit"/></td>
                    <td><input type="text" defaultValue={item.harga} ref="hargaEdit"/></td>
                    <td><input type="text" defaultValue={item.deskripsi} ref="descEdit"/></td>
                    <td>
                        <select ref="countryEdit" defaultValue={item.country}>
                            {this.putDataCountry()}
                        </select>
                    </td>
                    <td>
                        <select ref="kategoriEdit" defaultValue={item.kategori}>
                            {this.putDataKategori()}
                        </select>
                    </td>
                    {/* <td><input type="text" defaultValue={item.gambar1} ref="image1Edit"/></td>
                    <td><input type="text" defaultValue={item.gambar2} ref="image2Edit"/></td>
                    <td><input type="text" defaultValue={item.gambar3} ref="image3Edit"/></td> */}
                    <td><input onClick={()=> this.onBtnEditClick(item.id)} type="button" value="Submit" className="btn btn-primary"/></td>
                    <td><input onClick={()=> this.setState({selectedEdit:0})} type="button" value="Cancel" className="btn btn-danger"/></td>
                    
                </tr>
                )
            
        })
        return listJSXProduk
    }
    render(){
        
        return(
            <div className="container-fluid"> 
                <h1>Menu Produk</h1>
                <table className="tableadmin">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama produk</th>
                            <th>Harga produk</th>
                            <th>Deskripsi produk</th>
                            <th>Negara</th>
                            <th>kategori</th>
                            {/* <th>gambar1</th>
                            <th>gambar2</th>
                            <th>gambar3</th> */}
                            <th>Edit</th>
                            <th>Add Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListProduk()} 
                    </tbody>
                    <tfoot>
                        <td>Input</td>
                        <td>
                            <input ref="namaAdd" type="text" placeholder="Nama Produk" />
                        </td>
                        <td>
                            <input ref="hargaAdd" type="text" placeholder="harga Produk"/>
                        </td>
                        <td>
                            <input ref="descAdd" type="text" placeholder="deskripsi"/>
                        </td>
                        <td>
                            <select ref="countryAdd">
                                {this.putDataCountry()}
                            </select>
                        </td>
                        <td>
                            <select ref="kategoriAdd">
                                {this.putDataKategori()}
                            </select>
                        </td>
                        {/* <td>
                            <input ref="imageAdd" type="text" placeholder="Link image" /> 
                        </td>
                        <td>
                            <input ref="imageAdd2" type="text" placeholder="Link image" /> 
                        </td>
                        <td>
                            <input ref="imageAdd3" type="text" placeholder="Link image" /> 
                        </td> */}
                        <td>
                            <input onClick={this.onBtnAddClick} type="button" className="btn btn-button--success" value="submit"/>
                        </td>
                        <td></td>
                    </tfoot>
                </table>
                <a href="/admin"><button className="btn btn-secondary mt-5 mb-5">kembali</button></a>
            </div>
        );
        
    
    }
}
const mapStateToProps = (state) => {
    return{
      username:state.auth.username
    }
  }
export default  connect(mapStateToProps, null)(AdminInputProduk);