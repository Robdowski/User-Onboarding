import React, { useState, useEffect } from 'react'
import * as yup from "yup";
import { withFormik, Form, Field } from "formik";
import axios from "axios"

const UserForm = ({ values, errors, touched, status }) =>{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status){
            setUsers([...users, status])
        }
    }, [status])
    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                <Field type="password" name="password" placeholder="password" />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <label className="checkbox-container">
                    {" "}
                    Please select if you have read and agree to the terms of service.
                    <Field component="checkbox" name="tos" checked={values.tos} />
                </label>
                <button type="submit">Submit</button> 
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                </ul>
            ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().required("Please enter a name."),
        email: yup.string().required("Please enter an email."),
        password: yup.string().required("Please enter a password.")
    }),
    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res =>{
            setStatus(res.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
})(UserForm);

export default FormikUserForm;
