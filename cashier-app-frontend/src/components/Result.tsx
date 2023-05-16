import React, { Component } from "react";
import { ListGroup, Row, Col, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/util";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

type MyProps = {
  keranjang: any[];
  getListKeranjang: any;
};
type MyState = {
  showModal: boolean;
  keranjangDetail: boolean;
  jumlah: number;
  keterangan: string;
  totalHarga: any;
  product: any;
  id: any;
};

export default class Result extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
      product: {},
      id: 0,
    };
  }

  handleShow = (menukeranjang: any) => {
    this.setState({
      showModal: true,
      keranjangDetail: menukeranjang,
      jumlah: menukeranjang.jumlah,
      keterangan: menukeranjang.keterangan,
      totalHarga: menukeranjang.total_harga,
      product: menukeranjang.product,
      id: menukeranjang.id,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event: any) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.id, data)
      .then((res) => {
        this.props.getListKeranjang()
        swal({
          title: "Update keranjang",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          // button: "false"
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeOrder = (id: any) => {
    this.handleClose();

    // useEffect(() => {
      axios
        .delete(API_URL + "keranjangs/" + id)
        .then((res) => {
          this.props.getListKeranjang()
          swal({
            title: "Hapus pesanan",
            text: "Sukses Hapus Pesanan " + this.state.product.nama,
            icon: "error",
            // button: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    // });
  };

  render() {
    const { keranjang } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Result</strong>
        </h4>
        <hr />
        {keranjang.length !== 0 && (
          <ListGroup variant="flush">
            {keranjang.map((menukeranjang) => (
              <ListGroup.Item
                key={menukeranjang.id}
                onClick={() => this.handleShow(menukeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h5>
                      <Badge pill>{menukeranjang.jumlah}</Badge>
                    </h5>
                  </Col>
                  <Col>
                    <h5>{menukeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menukeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="floatRight">
                      Rp. {numberWithCommas(menukeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              removeOrder={this.removeOrder}
            />
          </ListGroup>
        )}

        <TotalBayar keranjang={keranjang} />
      </Col>
    );
  }
}
