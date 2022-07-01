import axios from 'axios'
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Login({user, setUser}) {
    const navigate = useNavigate()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        postSubmit(data)
    }

    const postSubmit = (data) => {
        axios.post('http://localhost:8000/api/v1/login', data)
            .then(res => {
                setUser(res.data.user)
                alert(res.data.message)
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/')
            })
            .catch(err => {
                alert(err)
            })
    }
    return (
        <div>
            <Container className='mt-5 col-6'>

                <Form onSubmit={onSubmitHandler} className='border p-5 rounded shadow'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name='email' required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder='Password' name='password' required />
                    </Form.Group>
                    <Button type='submit'>Login</Button>
                    <Button as={Link} to={'/register'} className='ms-3' variant='danger'>Registrasi</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login