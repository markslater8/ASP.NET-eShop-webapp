import React, {Component} from 'react';

import './Product.css';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: {}, 
            loading: true,
            formValues: {},
            editing: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.populateProductData();
    }

    async populateProductData() {
        const response = await fetch('api/products/' + this.state.id);
        const data = await response.json();
        this.setState({ product: data, loading: false, formValues: data });
    }

    render () {
        return (
            <div>
                <button id="editButton" onClick={this.onEdit}>{this.renderEditButtonText()}</button>
                <div id="product">
                    {this.renderProductImage(this.state.product)}
                    <div id="productContent">
                        {this.renderProductContentToDisplay()}
                    </div>
                </div>
            </div>
        );
    }

    renderEditButtonText() {
        return this.state.editing ? "Stop editing" : "Edit";
    }

    renderProductImage(product) {
        return (
            <div id="image">
                <img src={"images/" + product.imageUrl} alt=""/>
            </div>
        )
    }

    renderProductDetails (product) {
        return (
            <div id="productDetails">
                <p id="productTitle">{product.title}</p>
                <p id="productPrice">Price: <span>£{product.price}</span></p>
                <p id="productQuantity">{product.quantity} <span>in stock</span></p>
                <p id="productDescription"><span>About this product</span><br/>{product.description}</p>
                <p id="productSeller">Seller: <span>{product.seller}</span></p>
            </div>
        );
    }

    renderProductUpdateForm () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <p>Product Title: <input name="title" type="text" value={this.state.formValues.title} onChange={this.handleChange} /></p>
                    </div>
                    <div>
                        <p>Price: £<input name="price" type="number" value={this.state.formValues.price} onChange={this.handleChange} /></p>
                    </div>
                    <div>
                        <p>Quantity: <input name="quantity" type="number" value={this.state.formValues.quantity} onChange={this.handleChange} /></p>
                    </div>
                    <div>
                        <p>Description: <input name="description" type="text" value={this.state.formValues.description} onChange={this.handleChange} /></p>
                    </div>
                    <div>
                        <p>Seller's Name: <input name="seller" type="text" value={this.state.formValues.seller} onChange={this.handleChange} /></p>
                    </div>
                    <button id="updateButton" type="submit">Update</button>
                    <button id="deleteButton" onClick={this.onDelete}>Delete</button>
                </form>
            </div>
        )
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendProduct();
    }

    async sendProduct() {
        const body = JSON.stringify(this.state.formValues);
        const response = await fetch('api/products/', 
            {
                method: 'PUT', 
                body: body, 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        this.setState({product: data});
        console.log("Product updated.");
        this.setState({editing: false});
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => {
            // creating copy of state variable formValues
            let formValues = Object.assign({}, prevState.formValues);
            // update the name property, assign a new value
            formValues[name] = value;
            // return new object formValues object
            return { formValues };
          })
    }

    onEdit = async () => {
        this.setState({editing: !this.state.editing});
    }

    onDelete = async () => {
        const deletionUrl = "api/products/" + this.state.id
        await fetch(deletionUrl, { method: 'DELETE' });
        console.log("Product deleted");
        this.props.history.push("/products");
    }

    renderProductContentToDisplay() {
        let productDetails = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductDetails(this.state.product);
        
        let productUpdateForm = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductUpdateForm();
        
        let productContentToDisplay = this.state.editing
            ? productUpdateForm
            : productDetails
        
        return productContentToDisplay;
    }
}