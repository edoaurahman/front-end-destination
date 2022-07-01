import axios from "axios"
import { Button, Container, Form, FormLabel } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../utils/api"

const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: e.target.nama.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        postRegister(data)
    }

    const postRegister = (data) => {
        axios.post(API + "/v1/register", data)
        .then(res => {
            if (res.status === 200) {
                alert(res.data.message)
                navigate('/login')
            }
        })
    }
    return (
        <div>
            <div className="bg-light w-100">
                <Container className="p-5">
                    <h1 className="display-4">Registration</h1>
                    <hr className="my-4" />
                    <p className="lead">Registration to start new journey</p>

                </Container>
            </div>

            <Container className="mt-5">
                <div className="col-6 p-5 mx-auto border rounded shadow">
                    <Form onSubmit={handleSubmit}>
                        <FormLabel>Nama</FormLabel>
                        <Form.Control type="text" name="nama" placeholder="Nama" />
                        <FormLabel>Email</FormLabel>
                        <Form.Control type="email" name="email" placeholder="Email" />
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="text" name="password" placeholder="Password" />
                        <Button variant="primary" className="mt-3" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default Register