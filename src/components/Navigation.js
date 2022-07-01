import axios from 'axios'
import React from 'react'
import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../utils/api'

function Navigation({ user, setUser, setTrendingDestination, setTopDestination }) {
    const navigate = useNavigate()
    const Logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }
    const getDestination = () => {
        getTrendingDestination()
        getTopDestination()
    }
    const getTrendingDestination = () => {
        axios.get(API + '/v1/destination/type/trending')
            .then(res => {
                setTrendingDestination(res.data);
            })
    }
    const getTopDestination = () => {
        axios.get(API + '/v1/destination/type/top')
            .then(res => {
                setTopDestination(res.data);
            })
    }

    return (
        <Navbar bg="dark" expand="lg" className='navbar-dark' sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>DKTravel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to={'/'} onClick={() => getDestination()}>Home</Nav.Link>

                        {user != null ?
                            <DropdownButton title={user.name} id="dropdown-button-example" variant='default text-white'>
                                {user.level === 'admin' ?
                                    <Dropdown.Item as={Link} to="/admin">Admin</Dropdown.Item>
                                    :
                                    <div></div>
                                }
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                            </DropdownButton>
                            :
                            <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation