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


export const RetailerOrderList = () => {
    const { addToast } = useToasts()
    const products = useSelector(state => state.productData.products)
    const [offset, setOffset] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentData, setCurrentData] = React.useState([]);
    let dispatch = useDispatch()
    const pageLimit = 10;
    const editProductState = useSelector(state => state.editProductReducer.editProduct)

    const getProductDetails = async (productID) => {

        const productData = await firebase.database().ref('products').child(productID).once("value", async (snapshot) => {
            const snap = await snapshot.val();
            return snap;
        });

        // console.log(driverName.val())

        return productData.val();
    }


    const getUserDetails = async (childID) => {


        const userDetails = await firebase.database().ref('Users').child(childID).once("value", async (snapshot) => {
            const snap = await snapshot.val();
            // const driverName = snap["name"];
            // alert("found name" + snap["name"])
            return snap;
        });

        // console.log(driverName.val())

        return userDetails.val();
    }

    const getOrders = async () => {

        const purchasesRef = await firebase.database().ref('purchases');
        await purchasesRef.once('value', snap => {
            if (!snap.val()) return;
            const localUsers = Object.entries(snap.val())
            console.log(localUsers)
            const promises = (localUsers.map(async child => {

                const key = child[0]
                const values = child[1]
                const { details, userID, itemIDs, purchasedAt } = values
                let productInfo = []
                itemIDs.forEach(async itemID => {
                    const currentProductInfo = await getProductDetails(itemID[0])
                    productInfo.push({ ...currentProductInfo, productID: itemID[0], productQuantity: itemID[1] });
                    console.log({ ...currentProductInfo, productID: itemID[0], productQuantity: itemID[1] });
                })

                const userInfo = await getUserDetails(userID)
                console.log(userInfo);







                return productInfo.map(product => ({

                    orderID: key,
                    userID,
                    ...product,
                    ...details,
                    userEmail: userInfo?.userEmail,
                    userName: userInfo?.userName,
                    purchasedAt

                }));


            }))

            Promise.all(promises).then(data => setCurrentData(data.flat(1)))




        })


        // console.log("get driver children", driverChildren)

    }

    React.useEffect(() => {

        getOrders();

    }, []);

    const editFunc = () => {

    }
    const checkFunc = (e, item) => {

    }

    const deleteFunc = () => {

    }

    const deleteAllFunc = () => {

    }


    return (
        <div>
            <div style={{ minWidth: "26em", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginBottom: "1rem", }}>
                {/* <Button variant="info" onClick={editFunc} type="submit" style={{ marginRight: "0.2em" }} disabled={editProductState?.length !== 1}>
                    <AiFillEdit />
                </Button>

                <Button variant="danger" type="submit" onClick={deleteFunc}>    <AiFillDelete />

                </Button> */}

            </div>
            <Table striped bordered hover size="me">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Order First Name</th>
                        <th>Order Last Name</th>
                        <th>Company Name</th>
                        <th>Order Email</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>State</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Image</th>
                        <th>Short Description</th>
                        <th>Purchase Timestamp</th>
                    </tr>
                </thead>
                <tbody>

                    {/* <th className="d-flex"> <input type="checkbox" style={{ height: "20px" }} /></th> */}
                    {currentData?.map((item, index) => {
                        // eslint-disable-next-line
                        return <tr key={index}>
                            <td >{item?.orderID}</td>
                            <td style={{
                                color: 'rebeccapurple',
                                fontWeight: 'bold',
                                minWidth: '5em'
                            }}>{item?.productID}</td>
                            <td style={{
                                color: 'rebeccapurple',
                                fontWeight: 'bold',
                                minWidth: '18em'
                            }}>{item?.productName.toUpperCase()}</td>
                            <td style={{
                                fontSize: '20px',
                                color: 'crimson'
                            }}>{item?.price}</td>
                            <td style={{
                                fontSize: '20px',
                                color: 'crimson',
                                fontWeight: 'bold'
                            }}>{item?.productQuantity}</td>
                            <td style={{ color: 'blueviolet', fontWeight: 'bold' }}>{item?.category.join(', ').toUpperCase()}</td>
                            <td >{item?.userID}</td>
                            <td style={{
                                minWidth: '9em',
                                fontSize: '18px',
                                color: 'mediumblue'
                            }}>{item?.userName.toUpperCase()}</td>
                            <td >{item?.userEmail}</td>
                            <td style={{
                                minWidth: '9em',
                                fontSize: '18px',
                                color: 'mediumblue'
                            }}>{item?.fName.toUpperCase()}</td>
                            <td style={{
                                minWidth: '9em',
                                fontSize: '18px',
                                color: 'mediumblue'
                            }}>{item?.lName.toUpperCase()}</td>
                            <td >{item?.companyName.toUpperCase()}</td>
                            <td style={{
                                minWidth: '9em',
                                fontSize: '18px',
                                color: 'mediumblue'
                            }}>{item?.email}</td>
                            <td >{item?.country.toUpperCase()}</td>
                            <td >{item?.city.toUpperCase()}</td>
                            <td >{item?.phone.toUpperCase()}</td>
                            <td >{item?.state.toUpperCase()}</td>
                            <td >{item?.address1.toUpperCase()}</td>
                            <td >{item?.address2.toUpperCase()}</td>
                            <td style={{ width: "9em", maxWidth: "9em", wordBreak: "break-word", overflow: "hidden", textOverflow: "ellipsis" }}><img src={item?.image[0]} style={{ height: "7em", width: "7em" }} alt="Product" /></td>
                            <td >{item?.shortDescription.toUpperCase()}</td>
                            <td style={{
                                minWidth: '9em',
                                fontSize: '18px',
                                color: 'blue'
                            }}>{item?.purchasedAt}</td>

                        </tr>
                    })}



                </tbody>
            </Table>
            <div className="pro-pagination-style text-center mt-30">
                <Paginator
                    totalRecords={currentData?.length}
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
