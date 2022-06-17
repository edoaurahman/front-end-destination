import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { API } from '../../utils/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  useEffect(() => {
   getDestionations();
  }, [])

  const getDestionations = () => {
    axios.get(API + '/v1/destination')
    .then(res => {
      setDestinations(res.data);
    })
  }

  const deleteDestination = (id) => {
    console.log('delete');
    axios.delete(API + '/v1/destination/delete/' + id)
    .then(res => {
      alert(res.data.message)
      getDestionations();
    })
  }

  const [destinations, setDestinations] = useState([]);

  return (
    <div>
      <div className="bg-light w-100">
        <Container className="p-5">
          <h1 className="display-4">Halaman Admin</h1>
          <p className="lead">Disini anda dapat mengatur data yang ada di website ini</p>
          <hr className="my-4" />
        </Container>
      </div>

      <Container className='mt-5'>
        <Button className='mb-3' as={Link} to='/add-destination'>Tambah Destinasi Baru</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Destinasi</th>
              <th>Fasilitas</th>
              <th>Ubah</th>
            </tr>
          </thead>
          <tbody>
            {destinations&&destinations.map((destination) => (
              <tr key={destination.id}>
                <td>{destination.id}</td>
                <td>{destination.destination_name}</td>
                <td>{destination.facility}</td>
                <td>
                  <Button variant='primary btn-sm'>Update</Button>
                  <Button variant='danger btn-sm' onClick={() => deleteDestination(destination.id)}>Delete</Button>
                  <Button variant='warning btn-sm' as={Link} to={'/add-image/' + destination.destination_name}>Add Image</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Admin