import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { API } from '../utils/api';

function Detail({ user, topDestination }) {
    const { slug } = useParams();
    useEffect(() => {
        getDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getDetail = () => {
        axios.get(API + '/v1/destination/' + slug)
            .then(res => {
                setDetail(res.data);
                getComment(res.data.id)
            })

    }
    const [detail, setDetail] = useState([]);
    const commentPost = (e) => {
        e.preventDefault();
        document.getElementById('submitButton').disabled = true;
        const data = {
            destination_id: e.target.destination_id.value,
            user_id: user.id,
            comment: e.target.comment.value,
            rating: rating
        }

        axios.post(API + '/v1/comment/create', data)
            .then(res => {
                if (res.status === 200) {
                    alert(res.data.message);
                    getComment(detail.id);
                    e.target.comment.value = ''
                    document.getElementById('submitButton').disabled = false;

                } else {
                    alert(res);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getComment = (id) => {
        axios.get(API + '/v1/comment/' + id)
            .then(res => {
                setComment(res.data);
            })
    }

    const [comment, setComment] = useState();

    const ratingStar = (e) => {
        const star = document.querySelectorAll('#star')
        for (let j = 0; j < star.length; j++) {
            star[j].classList.remove('bi-star-fill')
            star[j].classList.add('bi-star')
        }
        for (let i = 0; i < e; i++) {
            star[i].classList.remove('bi-star')
            star[i].classList.add('bi-star-fill')
        }

        setRating(e)
    }

    const [rating, setRating] = useState(0);
    return (
        <div>
            <div className="bg-light p-3 text-center">
                <Image className='detail-img rounded' src="https://placeimg.com/800/400/any" />
                <div className='w-100'>
                    <h1 className='detail-title mx-auto'>{detail && detail.destination_name}</h1>
                </div>
            </div>

            <Container className='mt-3'>
                <Row className='justify-content-center shadow p-3'>
                    {detail.image && detail.image.map((item) => (
                        <Col key={item.id} lg={6} className='mb-3'>
                            <Card>
                                <Card.Img variant="top" src={"http://localhost:8000/images/destination/" + item.image_name} />
                            </Card>
                        </Col>
                    ))}

                </Row>

                <div className='mt-5 border rounded shadow p-5 mb-5'>
                    <h5>Deskripsi : </h5>
                    <hr />
                    <p>
                        {detail && detail.description}
                    </p>
                    <h5>Fasilitas : </h5>
                    <hr />
                    <p>{detail && detail.facility}</p>
                </div>

                <Row>
                    <Col lg={6}>
                        <div className='rounded shadow p-3'>
                            <h1 className='text-center'>Komentar</h1>
                            <hr />
                            <Form onSubmit={commentPost}>
                                <Form.Control as="textarea" name='comment' placeholder="Tulis komentar anda" rows={3} required />
                                <Form.Control name='destination_id' type="text" defaultValue={detail && detail.id} readOnly hidden rows={3} />
                                {/* Rating */}
                                <div className='rating d-flex mt-3 star-position'>
                                    <i className="bi bi-star me-2" id='star' onClick={() => ratingStar(1)}></i>
                                    <i className="bi bi-star me-2" id='star' onClick={() => ratingStar(2)}></i>
                                    <i className="bi bi-star me-2" id='star' onClick={() => ratingStar(3)}></i>
                                    <i className="bi bi-star me-2" id='star' onClick={() => ratingStar(4)}></i>
                                    <i className="bi bi-star me-2" id='star' onClick={() => ratingStar(5)}></i>
                                </div>
                                {/* End Rating */}
                                <Button variant="warning mt-2" type="submit" id='submitButton'>Kirim</Button>
                            </Form>
                        </div>
                        <div className='comment-section mt-5 p-3 rounded shadow'>
                            {comment && comment.map((item) => (
                                <div key={item.id} className='rounded comment-box shadow p-3 mt-3'>
                                    <h3>{item.user.name}</h3>
                                    <h6>Rating: {item.rating}</h6>
                                    <p>
                                        {item.comment}
                                    </p>
                                </div>
                            ))}
                            {comment && comment.length === 0 && <p className='text-center'>Tidak ada komentar</p>}
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className='rounded shadow p-3'>
                            <h1 className='text-center'>Destinasi Lainnya</h1>
                            <hr />
                            <Row>
                                {topDestination && topDestination.slice(0, 4).map(item => (
                                    <Col key={item.id} lg={6} className="mb-2">
                                        <Card>
                                            <Card.Img variant="top" src={"http://localhost:8000/images/destination/" + item.image[0].image_name} />
                                            <Card.Header>{item.destination_name}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {item.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <Button variant="warning" href={'/detail/' + item.destination_name}>
                                                Detail
                                            </Button>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Detail