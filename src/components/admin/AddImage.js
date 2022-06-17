import React, { useState } from 'react'
import { Button, Container, Form, Col, Row, Image } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../utils/api';
import { useParams } from 'react-router-dom';

function AddImage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(API + '/v1/destination/addimage', formData)
            .then(res => {
                if (res.status === 200) {
                    alert(res.data.message);
                    // navigate('/admin');
                    getDetail()
                }
            })
    }

    const { slug } = useParams()

    const getDetail = () => {
        axios.get(API + '/v1/destination/' + slug)
            .then(res => {
                setDetail(res.data);
            })

    };
    const [detail, setDetail] = useState(getDetail);
    console.log(detail);
    return (
        <div>
            <div className="bg-light w-100">
                <Container className="p-5">
                    <h1 className="display-4">Tambah Foto Destinasi</h1>
                    <p className="lead">Disini anda dapat mengatur data yang ada di website ini</p>
                    <hr className="my-4" />
                </Container>
            </div>

            <Container className="p-5">
                <div className='mb-3'>
                    <Row>
                        {detail && detail.image.map(item => (
                            <Col lg={3} key={item.id}>
                                <Image thumbnail src={'http://localhost:8000/images/destination/' + item.image_name} />
                            </Col>
                        ))}
                    </Row>
                    <hr/>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Destinasi</Form.Label>
                        <Form.Control type="text" defaultValue={detail && detail.destination_name} readOnly />
                    </Form.Group>
                    <Form.Control type="text" name="destination_id" defaultValue={detail && detail.id} hidden readOnly />
                    <Form.Group className="mb-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control type="file" name='image' />
                    </Form.Group>
                    <Button type='submit'>Simpan</Button>
                </Form>
            </Container>
        </div>
    )
}

export default AddImage