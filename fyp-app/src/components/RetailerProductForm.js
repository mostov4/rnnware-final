import React from 'react'
import { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { VscAdd } from 'react-icons/vsc';
import firebase from "firebase"
import { useDispatch, useSelector } from 'react-redux';
import { editProductTempAction } from '../redux/actions/editProductTemp';
import { useToasts } from 'react-toast-notifications';
import { BiUpload } from 'react-icons/bi';



export const RetailerProductForm = () => {
    const { addToast } = useToasts()

    // eslint-disable-next-line
    const Fbproductlength = useSelector(state => state?.productData?.products)
    const tempt = Number(useSelector(state => state?.productData?.products)[Fbproductlength.length - 1]?.id) + 1
    const productLength = tempt ? tempt : 0
    const editProduct = useSelector(state => state?.editProductReducer?.editProduct)
    const inputCheckBollean = useSelector(state => state.editProductTempReducer.editProductTemp)
    let dispatch = useDispatch()
    const [temp, setTemp] = useState("")


    const [state, setstate] = useState({
        productName: "",
        price: "",
        rating: "",
        saleCount: "",
        category: [],
        country: "",
        // tag: "",
        stock: "",
        image: "",
        shortDescription: "",
        fullDescription: ""
    })

    React.useEffect(() => {
        console.log(editProduct, "editproduct")
        if (inputCheckBollean) {
            setstate({
                id: editProduct[0]?.id,
                productName: editProduct[0].productName,
                price: editProduct[0].price,
                rating: editProduct[0].rating,
                saleCount: editProduct[0].saleCount,
                category: editProduct[0].category[1],
                country: editProduct[0].country,
                // tag: editProduct[0].tag,
                stock: editProduct[0].stock,
                image: editProduct[0].image[0],
                shortDescription: editProduct[0].shortDescription,
                fullDescription: editProduct[0].fullDescription
            })
            setTemp(true)
            dispatch(editProductTempAction(false))
        }
    }, [inputCheckBollean, dispatch, editProduct])

    const imgUpload = (e) => {
        var file = e.target.files[0]
        firebase.storage().ref(`productsImages/${productLength}`).put(file).then(() => {
            firebase.storage().ref(`productsImages/${productLength}`).getDownloadURL().then(urlImg => {
                setstate({ ...state, image: String(urlImg) })

            })
        }).catch((e) => console.log(e.message, "error in profile pic put"))
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        let tempLength = temp ? state?.id : productLength
        firebase.database().ref(`/products/${tempLength}`).update({
            "id": tempLength,
            "productName": state?.productName,
            "price": state?.price,
            "rating": state?.rating,
            "saleCount": state?.saleCount,
            "category": ["furniture", state?.category],
            "country": state?.country,
            // "tag": [state?.tag],
            "stock": state?.stock,
            "image": [state?.image],
            "shortDescription": state?.shortDescription,
            "fullDescription": state?.fullDescription

        }).then(() => {
            setstate({
                productName: "",
                price: "",
                rating: "",
                saleCount: "",
                category: [],
                country: "",
                // tag: "",
                stock: "",
                image: [],
                shortDescription: "",
                fullDescription: ""
            })
            setTemp(false)
            dispatch(editProductTempAction(false))
            addToast("Success", { appearance: "success", autoDismiss: true });

        }).catch((e) => addToast("Error", { appearance: "error", autoDismiss: true })
        )
    }
    return (
        <div>
            <Form onSubmit={(e) => HandleSubmit(e)} >
                <Form.Row style={{ alignItems: "center" }}>
                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label >Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Product Name" value={state.productName} onChange={(e) => setstate({ ...state, productName: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" value={state.price} onChange={(e) => setstate({ ...state, price: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" value={state.rating} placeholder="Rating" onChange={(e) => setstate({ ...state, rating: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Sale count</Form.Label>
                        <Form.Control type="number" value={state.saleCount} placeholder="Sale count" onChange={(e) => setstate({ ...state, saleCount: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" onChange={(e) => e.target.value !== "Select product category" ? setstate({ ...state, category: e.target.value }): null} required={true}>
                            <option defaultValue="Select product category" value="Select product category" selected={"Select product category"}>Select product category</option>
                            <option selected={state.category === "Dine"} value="Dine">Dine</option>
                            <option selected={state.category === "Storage"} value="Storage">Storage</option>
                            <option selected={state.category === "Serve"} value="Serve">Serve</option>
                            <option selected={state.category === "Utensils"} value="Utensils">Utensils</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" onChange={(e) => e.target.value !== "Select product country" ? setstate({ ...state, country: e.target.value }) : null} required={true}>
                            <option defaultValue="Select product country" value="Select product country" selected={"Select product country"} >Select product country</option>
                            <option selected={state.country === "United Kingdom"} value="United Kingdom"> United Kingdom</option>
                            <option selected={state.country === "Netherlands"} value="Netherlands">Netherlands</option>
                            <option selected={state.country === "Austria"} value="Austria">Austria</option>
                            <option selected={state.country === "Germany"} value="Germany">Germany</option>
                        </Form.Control>
                    </Form.Group>

                    {/* <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" value={state.tag} placeholder="Tag" onChange={(e) => setstate({ ...state, tag: e.target.value })} required={true} />
                    </Form.Group> */}

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" value={state.stock} placeholder="Stock" onChange={(e) => setstate({ ...state, stock: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label style={{ position: "relative", minWidth: "26em", width: "100%", marginBottom: 0 }} htmlFor="imgsrcinput"><Form.Label>Images</Form.Label>

                            <Form.File.Input id="imgsrcinput" title="" onChange={((e) => imgUpload(e))} style={{ backgroundColor: "white", opacity: "0", zIndex: 999, position: "absolute" }}required={true} />
                            <Form.Control id="imgsrcinput" readOnly={true} value={state?.image ? "image selected" : ""} placeholder="Upload image" required={true} style={{ backgroundColor: "white" }} />
                        </Form.Label> </Form.Group>

                    {/* <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label >Images
                        <Form.File.Input onChange={((e) => imgUpload(e))} style={{ backgroundColor: "white" }} required={true} />
                        </Form.Label>
                    </Form.Group> */}


                    <Form.Group as={Col} style={{ minWidth: "26em", width: "32%" }}>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type="text" value={state.shortDescription} placeholder="Short Description" onChange={(e) => setstate({ ...state, shortDescription: e.target.value })} required={true} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ minWidth: "28em", maxWidth: "26em" }}>
                        <Form.Label>Full Description</Form.Label>
                        <Form.Control type="text" value={state.fullDescription} placeholder="Full Description" onChange={(e) => setstate({ ...state, fullDescription: e.target.value })} required={true} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginTop: "1.2%", width: "3em" }} >
                        {!temp ? <VscAdd />
                            : <BiUpload />}
                    </Button>
                    {/* <div style={{ minWidth: "26em", display: "flex", justifyContent: "flex-end", alignItems: "flex-end",marginTop:"1.2%", height:"3em" }}>
                        <Button variant="primary" type="button" >
                            <GoSearch />  Filter
                        </Button>
                    </div> */}
                </Form.Row>

            </Form>
        </div>
    )
}


