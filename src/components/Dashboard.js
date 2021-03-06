import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/api';

function Dashboard({ topDestination, trendingDestination }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    console.log(e.target.value);
    const search = e.target.value;
    const list = document.querySelectorAll('.destination');
    console.log(list);
    list.forEach(item => {
      if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
        item.style.display = 'block';
      }
      else {
        item.style.display = 'none';
      }
    }
    )
  }
  const getComment = () => {
    axios.get(API + '/v1/comments')
      .then(res => {
        setComment(res.data);
      })
  }

  const [comment, setComment] = useState(getComment);
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="detail-img d-block carousel-img mx-auto"
            src="https://placeimg.com/800/400/any"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Find Your Suitable Destination</h3>
            <p>Explore incredible things to do around Madura</p>
            <div className='col-lg-6 col-sm-12 mx-auto'>
              <Form.Control onKeyUp={handleSearch} id='formsearch' className='text-center' type="text" placeholder="Search..." />
            </div>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>

      <Container>

        <Row className='mt-3'>
          <Col lg={6}>
            <h1 className='text-center'>Trending Destination</h1>
            <hr />
            <Row>
              {trendingDestination.map(item => (
                <Col lg={6} key={item.id} className='mb-3 destination'>
                  <Card>
                    <Card.Img variant="top" className='dashboard-img' src={item.image && "http://localhost:8000/images/destination/" + item.image[0].image_name} />
                    <Card.Header>{item.destination_name}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Button variant="warning w-100" onClick={() => navigate('/detail/' + item.destination_name)}>
                        Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={6}>
            <h1 className='text-center'>Top Destination</h1>
            <hr />
            <Row>
              {topDestination.map(item => (
                <Col lg={6} key={item.id} className='mb-3 destination '>
                  <Card>
                    <Card.Img variant="top" className='dashboard-img' src={item.image && "http://localhost:8000/images/destination/" + item.image[0].image_name} />
                    <Card.Header>{item.destination_name}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Button variant="warning" onClick={() => navigate('/detail/' + item.destination_name)}>
                        Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <h1 className='text-center'>Komentar</h1>
            <hr />
            {comment && comment.map(item => (
              <div key={item.id} className='border rounded shadow p-3'>
                <div className='fw-bold pe-auto' role="button">{item.user.name} - <span onClick={() => { navigate('/detail/' + item.destination.destination_name) }}>{item.destination.destination_name}</span></div>
                <hr />
                <p>
                  {item.comment}
                </p>
              </div>
            ))}
          </Col>
          <Col lg={6}>
            <h1 className='text-center'>SUBSCRIBE</h1>
            <hr />

            <div className='border rounded shadow p-3'>
              <p>
                jangan lupa subscribe, untuk mendapatkan notifikasi terbaru dari kami
              </p>
              <div className='text-center'>
                <Button variant='danger'>SUBSCRIBE</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard