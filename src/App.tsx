import React, { Component } from 'react'
import './App.css';
import { Row, Col, Container } from 'react-bootstrap';
import {Result, ListCategories, Menus, NavbarComponent} from './components/Index';
import { API_URL } from './utils/constants';
import axios from 'axios';

interface LMenu {
  id: number;
  nama:string;
  kode:string;
  is_ready:boolean;
  gambar:string;
  category:object;
}

export default class App extends Component<{}, {menus:LMenu[]}> {
  constructor(props:any) {
    super(props)
  
    this.state = {
       menus: []
    }
  }

  componentDidMount(): void {
    axios
      .get(API_URL+"products")
      .then(res=>{
        const menus = res.data
        this.setState({menus})
      })
      .catch(error=>{
        console.log(error)
      })
  }

  render() {
    const {menus} = this.state
    
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
            <Container fluid>
              <Row>
                <ListCategories />
                  <Col>
                    <h4><strong>Product List</strong></h4>
                    <hr />
                    <Row>
                      {menus && menus.map((menu:LMenu) => (
                        <Menus 
                          key={menu.id}
                          menu={menu}
                        />
                      ))}
                    </Row>
                  </Col>
                <Result />
              </Row>
          </Container>
        </div>
      </div>
    )
  }
}
