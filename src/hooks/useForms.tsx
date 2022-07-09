import { ChangeEventHandler, useState } from 'react'

const useForm = (initialState: any): [any, ChangeEventHandler<HTMLInputElement>, () => void] => {
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
