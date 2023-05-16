import React, { Component } from "react";
import "../App.css";
import { Row, Col, Container } from "react-bootstrap";
import { Result, ListCategories, Menus, NavbarComponent } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

interface LMenu {
  id: number;
  nama: string;
  kode: string;
  is_ready: boolean;
  gambar: string;
  category: object;
}

export default class Home extends Component<
  {},
  { menus: LMenu[]; selectCategory: string; keranjang: any[] }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      menus: [],
      selectCategory: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount(): void {
    axios
      .get(API_URL + "products?category.nama=" + this.state.selectCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState: any) {
  //   if (this.state.keranjang !== prevState.keranjang) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjang = res.data;
  //         this.setState({ keranjang });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value: string): void => {
    this.setState({
      selectCategory: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value: any) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses masuk keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                // button: "false"
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses masuk keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                // button: "false"
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, selectCategory, keranjang } = this.state;

    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              selectCategory={selectCategory}
              changeCategory={this.changeCategory}
            />
            <Col>
              <h4>
                <strong>Product List</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu: LMenu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Result
              keranjang={keranjang}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
