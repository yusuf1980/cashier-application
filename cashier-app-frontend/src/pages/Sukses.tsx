import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Sukses extends Component {
  render() {
    return (
      <div className='mt-4 text-center'>
        <h2>Sukses Pesan</h2>
        <p>Terima kasih sudah memesan</p>
        <Link to="/">
            <Button variant="primary">
                Kembali
            </Button>
        </Link>
      </div>
    )
  }
}
