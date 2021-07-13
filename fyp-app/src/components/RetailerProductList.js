import React from 'react'
import { Button } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from 'react-hooks-paginator';
import { editProductAction } from '../redux/actions/editProduct';
import { editProductTempAction } from '../redux/actions/editProductTemp';
import { editProductDeleteAction, deleteAllAction } from '../redux/actions/editDelete';
import firebase from "firebase"
import { useToasts } from 'react-toast-notifications';


export const RetailerProductList = () => {
    const { addToast } = useToasts()
    const products = useSelector(state => state.productData.products)
    const [offset, setOffset] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentData, setCurrentData] = React.useState([]);
    let dispatch = useDispatch()
    const pageLimit = 10;
    const editProductState = useSelector(state => state.editProductReducer.editProduct)

    React.useEffect(() => {
        setCurrentData(products.slice(offset, offset + pageLimit));
    }, [offset, products]);

    const editFunc = () => {
        if (editProductState.length === 1)
            dispatch(editProductTempAction(true))
    }
    const checkFunc = (e, item) => {
        if (e.checked)
            dispatch(editProductAction(item))
        else dispatch(editProductDeleteAction(item?.id))
    }

    const deleteFunc = () => {
        let temp = 0
        editProductState.forEach((item, index) => {
            firebase.database().ref("/products/" + item?.id).set(null).then(() => {
                temp++
                if (temp === editProductState.length) {
                    addToast("Success", { appearance: "success", autoDismiss: true });
                }
                dispatch(deleteAllAction([]))
            })
        })
    }
    const deleteAllFunc = (e) => {
        if (e.checked)
            dispatch(deleteAllAction(products))
        else dispatch(deleteAllAction([]))
    }



    return (
        <div>
            <div style={{ minWidth: "26em", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginBottom: "1rem", }}>
                <Button variant="info" onClick={editFunc} type="submit" style={{ marginRight: "0.2em" }} disabled={editProductState?.length !== 1}>
                    <AiFillEdit />
                </Button>

                <Button variant="danger" type="submit" onClick={deleteFunc}>    <AiFillDelete />

                </Button>

            </div>
            <Table striped bordered hover size="me">
                <thead>
                    <tr>
                        <th className="d-flex"> <input type="checkbox" checked={editProductState?.length === products.length} onChange={(e) => deleteAllFunc(e.target)} style={{ height: "3em", width: "2em" }} /></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Sale Count</th>
                        <th>Category</th>
                        <th>Country</th>
                        {/* <th>Tag</th> */}
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Short Description</th>
                        <th>Full Description</th>
                    </tr>
                </thead>
                <tbody>

                    {/* <th className="d-flex"> <input type="checkbox" style={{ height: "20px" }} /></th> */}
                    {currentData?.map((item, index) => {
                        // eslint-disable-next-line
                        return <tr key={index}>
                            <td className="d-flex"> <input type="checkbox" checked={(editProductState?.length && editProductState?.filter(item1 => item1?.id === item?.id).length)} onChange={(e) => checkFunc(e.target, item)} style={{ height: "2.5em", width: "1.5em", border: "none" }} /></td>
                            <td >{item?.productName}</td>
                            <td >{item?.price}</td>
                            <td >{item?.rating}</td>
                            <td >{item?.saleCount}</td>
                            <td >{item?.category[1]}</td>
                            <td >{item?.country}</td>
                            {/* <td >{item?.tag[0]}</td> */}
                            <td >{item?.stock}</td>
                            <td style={{ width: "9em", maxWidth: "9em", wordBreak: "break-word", overflow: "hidden", textOverflow: "ellipsis" }}><img src={item?.image[0]} style={{ height: "7em", width: "7em" }} alt="Product" /></td>
                            <td >{item?.fullDescription}</td>
                            <td >{item?.shortDescription}</td>
                        </tr>
                    })}



                </tbody>
            </Table>
            <div className="pro-pagination-style text-center mt-30">
                <Paginator
                    totalRecords={products?.length}
                    pageLimit={pageLimit}
                    pageNeighbours={1}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                />
            </div>
        </div>
    )
}
