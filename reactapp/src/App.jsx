import React, { Component } from 'react';
import './App.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true, searchItem: "", filteredList: []};
    }

    componentDidMount() {
        this.populate();
    }

    handleInputChange = (e) => {
        const searchTerm = e.target.value;
        this.setState({ searchItem: searchTerm });

        console.log(searchTerm)
        const filteredItems = this.state.products.filter((x) =>
            x.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log(filteredItems)
        this.setState({ filteredList: filteredItems });
    }

    static renderProducts(products) {
        return (
            <div className="products">
                {products.map(product =>
                    <div className="card" key={product.id}>
                        <img src={product.images[0]} alt={product.Name} style={{ width: '100%' }} />
                        <h5>{product.title}</h5>
                        <p>{product.price}</p>
                        <p className="description">{product.description}</p>
                        <p><b>{product.id}</b></p>
                    </div>
                )}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p>Loading...</p>
            : App.renderProducts(this.state.filteredList);

        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Products</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <input
                    id="searchProduct"
                    type="text"
                    value={this.state.searchItem}
                    onChange={this.handleInputChange}
                    placeholder='Type to search'
                />
                {contents}
            </div>
        );
    }

    async populate() {
        //TODO: Handle different responses.
        const response = await fetch('getProducts');


        if (response.status === 200) {
            const data = await response.json();
            this.setState({ products: data, filteredList: data, loading: false });
        }
    }
}
