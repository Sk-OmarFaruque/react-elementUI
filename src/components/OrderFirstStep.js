import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Card, Layout, Radio } from 'element-react';

import 'element-theme-default';
require('dotenv');
class OrderFirstStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      selectedCategory: 'All',
      image: 'https://eleme.github.io/element-react/50e4091cc60a.png',
      categories: [],
      products: [],
      allProducts: []
    }
  }
  async componentDidMount () {
    console.log('firststep', this.props)
    document.title = "Category & Products";
    let res = await fetch(`${process.env.REACT_APP_API_URL}/product/list`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    let result = await res.json();
    if (result.status === 200) {
      this.setState({categories: result.categories})
    }
    let proArray = []
    await result.categories.map(data => {
      return data.Products.map(proData => {
        return proArray.push(proData)
      })
    })
    this.setState({products: proArray})
    this.setState({allProducts: proArray})
  }
  async onChange(key, value) {
    if (value === 'All') {
      this.setState({products: this.state.allProducts})
    } else {
      let res =  await this.state.categories.find(data => {
        return data.CategoryName === value
      })
      if (res) {
        this.setState({products: res.Products})
      }
    }
    this.setState({
      [key]: value
    });
    this.props.cartCategory({title: value, id: 12})
  }
  productNext (key) { // here key is the product index
    let product = this.state.products[key]
    this.props.cart(product)
    this.props.history.push("/order-second-step");
  }

  render () {
   let products =  this.state.products.map((productInfo, key) => {
     return  <Layout.Col key span="6"  style={{margin: '.1rem', width: '25%'}}>
     <a onClick={this.productNext.bind(this, key)}><Card bodyStyle={{ padding: 0 }} >
       <div style={{ padding: '6%', textAlign: 'center' }}>
         <span>{productInfo.Name}</span>
         <div className="bottom clearfix">
         {productInfo.Price}Tk<hr/>
          <span> <Button type="primary">Order</Button></span>
         </div>
       </div>
     </Card>
     </a>
   </Layout.Col>
   }) 
     let category =  this.state.categories.map((categoryInfo, key) => {
     return  <Radio.Button key value={categoryInfo.CategoryName}/>
    
   }) 
    return (
      <SiteLayout>
        {/* <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout.Row type="flex" justify="left">
          <Layout.Col>
              <Radio.Group className="orderFirst" key="fstep" size="large" value={this.state.selectedCategory} onChange={this.onChange.bind(this, 'selectedCategory')}>
              <Radio.Button value="All" className="firstChild"/>
                {category}
              </Radio.Group>
          </Layout.Col>
        </Layout.Row>
        <hr/>
        <Layout.Row  justify="left" gutter="1" >
        {products}
        </Layout.Row>
      </SiteLayout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  cart: (product) => dispatch({ type: 'tempProduct', product }),
  cartCategory: (category) => dispatch({ type: 'tempCategory', category }),
})
export default connect(null, mapDispatchToProps)(OrderFirstStep);  