import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(API + '/v1/destination/create', formData)
        .then(res => {
            if(res.status === 200){
                alert(res.data.message);
                navigate('/admin');
            }
        })
        .catch(err => {
            console.log(err);   
        })
    }
    return (
        <div>
            <div className="bg-light w-100">
                <Container className="p-5">
                    <h1 className="display-4">Tambah Destinasi baru</h1>
                    <p className="lead">Disini anda dapat mengatur data yang ada di website ini</p>
                    <hr className="my-4" />
                </Container>
            </div>

            <Container className="p-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Destinasi</Form.Label>
                        <Form.Control type="text" name='destination_name' placeholder="Air Terjun ..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control as="textarea" name='description' rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fasilitas</Form.Label>
                        <Form.Control type="text" name='facility' placeholder="Fasilitas" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipe</Form.Label>
                        <Form.Select name='type'>
                            <option value={'trending_tours'}>Trending Tours</option>
                            <option value={'top_destinations'}>Top Destinations</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control type="file" name='image' placeholder="Foto" />
                    </Form.Group>

                    <Button type='submit'>Simpan</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Add