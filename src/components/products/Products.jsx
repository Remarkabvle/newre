import axios from 'axios';
import React, { Component } from 'react';
import './Products.css';

const API_URL = "https://dummyjson.com";

export default class Products extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            offset: 1,
            counter: 0
        };
    }

    componentDidMount() {
        axios
            .get(`${API_URL}/products?limit=${this.state.offset * 2}`)
            .then((res) => this.setState({ data: res.data.products }))
            .catch((err) => console.log(err));
    }

    componentDidUpdate(prevProvs, prevState) {
        if (this.state.offset !== prevState.offset) {
            axios
                .get(`${API_URL}/products?limit=${this.state.offset * 2}`)
                .then((res) => this.setState({ data: res.data.products }))
                .catch((err) => console.log(err));
        }
        if (this.state.counter !== prevState.counter) {
            console.log("counter render");
        }
    }

    render() {
        return (
            <section>
                <h2 className="header">Products</h2>
                <div className="container">
                    {
                        this.state.data ? (
                            this.state.data.map((el) => (
                                    <div key={el.id} className="product">
                                        <img src={el.images[0]} alt={el.title} className="product-image" />
                                        <p className="product-title">{el.title}</p>
                                        <p className="product-price">{el.price}$</p>
                                    </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </div>
                    <button onClick={()=> this.setState({offset: this.state.offset +1})}>See more</button>
            </section>
        );
    }
}
