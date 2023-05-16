import React, {Component} from 'react';
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}:any) => {
    if(nama==="Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if(nama==="Minuman") return <FontAwesomeIcon icon={faCoffee} className="" />
    if(nama==="Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

     return <FontAwesomeIcon icon={faUtensils} className="mr-2" />

}

type MyProps = {
    selectCategory: string,
    changeCategory: Function,
}
type MyState = {
    categories: any[]
}

export default class ListCategories extends Component<MyProps, MyState> {
    constructor(props:any) {
      super(props)
    
      this.state = {
         categories: []
      }
    }

    componentDidMount(): void {
        axios
          .get(API_URL+"categories")
          .then(res=>{
            const categories = res.data
            this.setState({categories})
          })
          .catch(error=>{
            console.log(error)
          })
      }

    render() {
        const {categories} = this.state
        const { changeCategory, selectCategory } = this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>Category List</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category)=>(
                        <ListGroup.Item 
                        key={category.id} 
                        onClick={()=>changeCategory(category.nama)} 
                        className={selectCategory===category.nama? "category-active":""}
                        style={{cursor: "pointer"}}
                        >
                          <h5>
                            <Icon nama={category.nama} /> {category.nama}
                          </h5>  
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}