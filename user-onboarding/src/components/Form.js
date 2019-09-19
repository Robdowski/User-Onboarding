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
        <div className="bg-blue-900 container half-width">
            <Form className="flex-col justify-center items-center content-center p-8">
                <h1 className="text-white text-6xl font-bold">Add User</h1>
                <Field className="my-5 text-black bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-half appearance-none leading-normal" type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (<p className="text-white">{errors.name}</p>)}
                <Field className="my-5 text-black bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-half appearance-none leading-normal" type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (<p className="text-white">{errors.email}</p>)}
                <Field className="my-5 text black bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-half appearance-none leading-normal" type="password" name="password" placeholder="password" />
                {touched.password && errors.password && (<p className="text-white">{errors.password}</p>)}
                <input type="checkbox" name="tos" />
                <label className="my-5 text-white checkbox-container">
                    Please select if you have read and agree to the terms of service.
                </label><br />
                <button type="submit" className="my-5 bg-gray-500 hover:bg-gray-100 rounded py-4 px-10">Submit</button> 
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Your username is: {user.name}</li>
                    <li>Your email address is: {user.email}</li>
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
