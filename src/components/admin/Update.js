import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API } from '../../utils/api';

function Update() {
    const { slug } = useParams()

    const getDetail = () => {
        axios.get(API + '/v1/destination/' + slug)
            .then(res => {
                setDetail(res.data);
            })

    };
    const [detail, setDetail] = useState(getDetail);
    console.log(detail);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id : detail.id,
            destination_name: e.target.destination_name.value,
            description: e.target.description.value,
            facility: e.target.facility.value,
            type: e.target.type.value,

        }
        console.log(data);
        axios.put(API + '/v1/destination/update', data)
        .then(res => {
            alert(res.data.message)
        })
    }
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Destinasi</Form.Label>
                        <Form.Control type="text" defaultValue={detail && detail.destination_name} name='destination_name'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control as="textarea" name='description' placeholder="Placeholder" rows={3}  defaultValue={detail && detail.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipe</Form.Label>
                        <Form.Select name='type' defaultValue={'trending_tours'}>
                            <option value='trending_tours' selected={detail && detail.type === 'trending_tours' ? true : false}>Trending Tours</option>
                            <option value='top_destination' selected={detail && detail.type === 'top_destinations' ? true : false}>Top Destinations</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fasilitas</Form.Label>
                        <Form.Control type="text" name='facility' defaultValue={detail && detail.facility}/>
                    </Form.Group>
                    <Button type='submit'>Update</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Update