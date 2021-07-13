import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import TabProductTwelveServe from "../../wrappers/product/TabProductTwelveServe";

const Serve = ({ products }) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('category');
    const [sortValue, setSortValue] = useState('Serve');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [filterValue, setFilterValue] = useState("")




    const pageLimit = 15;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getSortParamsCountry = (filterValue1) => {
        setFilterValue(filterValue1);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }


    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue,filterValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue, filterValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue,filterValue]);

    return (
        <Fragment>
            <MetaTags>
                <title>RNN-Ware | Serve</title>
            </MetaTags>

            <LayoutOne headerTop="visible">

                <TabProductTwelveServe
                    category="Serve"
                    spaceTopClass="pt-40"
                    sectionTitle="Best Products"
                />

                <div className="shop-area pt-95 pb-100">

                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={sortedProducts.length} sortedProductCount={currentData.length} getSortParams={getSortParams} getSortParamsCountry={getSortParamsCountry}/>

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

Serve.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = state => {
    return {
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(Serve);