import { ChangeEventHandler, useState } from 'react'
import { Form } from '../types/Form'

const useForm = (initialState: Form): [Form, ChangeEventHandler<HTMLInputElement>, () => void] => {
    const [form, setForm] = useState(initialState)

    const handleInputChange = (event: { target: { value: string; name: string } }) => {
        const { value, name } = event.target
        setForm({ ...form, [name]: value })
    }

    const clear = () => {
        setForm(initialState)
    }

    return [form, handleInputChange, clear]
}

export default useForm
