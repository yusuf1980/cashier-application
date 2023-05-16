import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
// import {  } from "react-router-dom";

type MyProps = {
  keranjang: any[];
//   history: any;
};

export default class extends Component<MyProps> {

  submitTotalBayar = (totalBayar: number) => {
    // const history = useHistory();
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjang,
    };

    axios.post(API_URL + "pesanan", pesanan).then((res) => {
        // history.push('/sukses')
    //   this.props.history.push('/sukses')
    });
  };

  render() {
    // console.log(this.props.keranjang)
    let TotalBayar = 0;
    if (this.props.keranjang.length) {
      TotalBayar = this.props.keranjang.reduce(function (
        result: any,
        item: any
      ) {
        return result + item.total_harga;
      },
      0);
    }

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga:{" "}
              <strong className="float-right mr-2">
                {" "}
                Rp. {numberWithCommas(TotalBayar)}
              </strong>
            </h4>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(TotalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
