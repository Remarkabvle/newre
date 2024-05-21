import axios from 'axios';
import React, { Component, Fragment } from 'react';
import './Products.css';


const API_URL = "https://dummyjson.com";

export default class Products extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            categories: null,
            offset: 1,
            counter: 0,
            categoryValue: "/products",
            loading: false
        };
    }

    componentDidMount() {
        this.fetchProducts();
        this.fetchCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset || this.state.categoryValue !== prevState.categoryValue) {
            this.fetchProducts();
            if (this.state.categoryValue !== prevState.categoryValue) {
                this.setState({ offset: 1 });
            }
        }
    }

    fetchProducts() {
        this.setState({ loading: true });
        axios
            .get(`${API_URL}${this.state.categoryValue}?limit=${this.state.offset * 12}`)
            .then(res => this.setState({ data: res.data.products, loading: false }))
            .catch(err => console.log(err));
    }

    fetchCategories() {
        axios
            .get(`${API_URL}/products/categories`)
            .then(res => this.setState({ categories: res.data }))
            .catch(err => console.error(err));
    }

    render() {
        const categories = this.state.categories?.map((category) => (
            <li key={category}>
                <button
                    style={{
                        color: this.state.categoryValue === `/products/category/${category}` ? "#000" : "#A0A0AB",
                        borderBottom: this.state.categoryValue === `/products/category/${category}` ? "2px solid #000" : "2px solid transparent",
                        background: "none",
                        border: "none",
                        cursor: "pointer"
                    }}
                    onClick={() => this.setState({ categoryValue: `/products/category/${category}`, offset: 1 })}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                </button>
            </li>
        ));

        return (
            <Fragment>
                <section className='products container'>
                    <div className='products__categories'>
                        <ul className='products__list'>
                            <li>
                                <button
                                    style={{
                                        color: this.state.categoryValue === `/products` ? "#000" : "#A0A0AB",
                                        borderBottom: this.state.categoryValue === `/products` ? "2px solid #000" : "2px solid transparent",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.setState({ categoryValue: `/products`, offset: 1 })}
                                >
                                    All
                                </button>
                            </li>
                            {categories}
                        </ul>
                    </div>
                    <div className='products__cards'>
                        {this.state.data ? (
                            this.state.data.map((el) => (
                                <div key={el.id} className="product">
                                    <img src={el.images[0]} alt={el.title} className="product-image" />
                                    <p className="product-title">{el.title}</p>
                                    <p className="product-price">{el.price}$</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <button
                        disabled={this.state.loading}
                        onClick={() => this.setState({ offset: this.state.offset + 1 })}
                        className='products__btn'
                    >
                        показать ещё 
                    </button>
                </section>
            </Fragment>
        );
    }
}
