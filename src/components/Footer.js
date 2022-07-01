import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
    return (
        <div className="bg-dark text-white mt-5 w-100">
            <Container className="p-5">
                <h1 className="display-4">Footer</h1>
                <hr className="my-4" />
                <p className="lead">Content</p>

            </Container>
        </div>
    )
}
