import React, { useState, useEffect } from 'react'
import '../../css/promoted.scss'
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export const Promoted = () => {
    const token = localStorage.getItem('mytoken')
    const history = useHistory();
    const [inputs, setInputs] = useState({
        tokenAddress: '',
        tokenName: '',
        tokenSymbol: '',
    })
    const [tokenLogo, settokenLogo] = useState('')
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([{
        tokenName: '',
        tokenAddress: '',
        tokenSymbol: '',
        tokenLogo:'',
        status: '',
        id:'',
    }]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const { tokenAddress, tokenName, tokenSymbol } = inputs;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleFileSelect = (evt) => {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = _handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }


    //image upload handler
    const _handleReaderLoaded = (readerEvt) => {
        var binaryString = readerEvt.target.result;
        var base64textString = btoa(binaryString);
        var base64 = base64textString
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/image/upload", { base64 }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                const baseString = response.data.image;
                console.log("qwerty:::", baseString);
                settokenLogo(baseString)

            });
    }

    const handleSubbmit = (e) => {
        e.preventDefault();
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/addPromotion", { tokenAddress, tokenName, tokenSymbol, tokenLogo }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {


            });
    }


    const getData = async () => {
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/allPromotions", { limit: 10, offset: 0 }, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setData(response.data.items)
                setPageCount(Math.ceil(data.length / perPage))
            }
            )
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const logout = ()=>{
        history.push("/admin/login");
    }

    useEffect(() => {
        getData()
    }, [offset])



    const promotionDelete = async (e)=>{
        console.log("e aa bhi rha hai k nhi " , e)
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/deletePromotion", { id : e.id }, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
            // setData(response.data.items)
            console.log("delet::::",response)
        }

        )
    }

    const promotionUpdate = async (e)=>{
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/updatePromotion", { status : e.status, id : e.id }, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
            // setData(response.data.items)
            console.log("update::::",response)
        }

        )
    }

    const promotedData = data.map(elem => {
        return (

            <tr>
                <td>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <img src={elem.tokenLogo} alt="" width="50px" height="50px" className="img-fluid w40" />
                            &nbsp;
                            <span className="white">{elem.tokenName}</span>
                        </li>
                    </ul>
                </td>
                <td className="white">
                    <span>{elem.tokenSymbol}</span>
                </td>
                <td className="white">
                    <a className="white" href="">
                        <span>{elem.tokenAddress}</span>
                    </a>
                </td>
                <td className="green">
                    <span>
                        <div class="form-check">
                            <a  onClick={() =>{promotionUpdate(elem)}}>
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            </a>
                        </div>
                    </span>
                </td>
                <td>
                    <a className="" onClick={() =>{promotionDelete(elem)}}>
                        <span>
                            <img src="\chrtapp-assets\delete-icon.svg" />
                        </span>
                    </a>
                </td>
            </tr>
        )
    });


    return (
        <>
            <section className="promotion ">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" >
                                    <img src="logo.svg" alt="" className="img-fluid" />
                                </a>
                                <ul className="list-inline">
                                    <button className="navbar-toggler only-btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    </button>
                                </ul>
                                <div className="collapse navbar-collapse content" id="navbarSupportedContent" >
                                    <form className="form-inline">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <button className="btn-red my-2 my-sm-0" type="button" onClick={logout} >
                                                            Logout  </button>

                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="row ptb">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2">
                            <div className="inner-btn">
                                <button className="btn-common" type="button" data-toggle="modal" data-target="#exampleModal">
                                    ADD
                                </button>
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">

                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="inner-tile ">
                                                            <h3 className="common text-center">ADD TOKEN</h3>
                                                            <hr />
                                                            <div className="row ptb20">
                                                                <div className="col-sm-7 p-0">
                                                                    <div class="form-group">
                                                                        <label for="exampleInputEmail1" className="common">Token Name</label>
                                                                        <input type="email" name="tokenName" value={tokenName} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter token name" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-5">
                                                                    <div class="form-group">
                                                                        <label for="exampleInputEmail1" className="common">Token Symbol</label>
                                                                        <input type="email" name="tokenSymbol" value={tokenSymbol} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter token symbol" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 p-0">
                                                                    <div class="form-group">
                                                                        <label for="exampleInputEmail1" className="common">Token Address</label>
                                                                        <input type="email" name="tokenAddress" value={tokenAddress} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter token address" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 p-0">
                                                                    <div class="upload text-center">
                                                                        <label for="file-upload" class="custom-file-upload">
                                                                            <img src="\chrtapp-assets\upload-icon.svg" alt="" className="img-fluid w40" />
                                                                        </label>
                                                                        <input id="file-upload" type="file" onChange={handleFileSelect} />
                                                                        <h6 className="grey" >Drag & drop or <span className="common">Browse</span></h6>
                                                                        <h6 className="grey">.JPG and .PNG formats only in 150x150 px size</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ReactPaginate
                                                            previousLabel={"prev"}
                                                            nextLabel={"next"}
                                                            breakLabel={"..."}
                                                            breakClassName={"break-me"}
                                                            pageCount={pageCount}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={handlePageClick}
                                                            containerClassName={"pagination"}
                                                            subContainerClassName={"pages pagination"}
                                                            activeClassName={"active"} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer text-center">
                                                <button type="button" className="btn-common" onClick={handleSubbmit}>Add Token</button>
                                                <button type="button" className="btn-black" data-dismiss="modal">CANCEL</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="common">Token</th>
                                            <th scope="col" className="common">Symbol</th>
                                            <th scope="col" className="common">Token Address</th>
                                            <th scope="col" className="common">Publish</th>
                                            <th scope="col" className="common">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {promotedData}
                                        {/* <tr>
                                            <td>
                                                <a className="" >
                                                    <span>
                                                        <img src="\chrtapp-assets\delete-icon.svg" />
                                                    </span>
                                                </a>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}