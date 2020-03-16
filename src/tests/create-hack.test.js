import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react';
import { CreateHack } from '../components/create-hack'
import axiosMock from 'axios'

// afterEach(cleanup);

test('Important info rendered', () =>{
    const {getByText} = render(<BrowserRouter><CreateHack/></BrowserRouter>)
    const element = getByText(/Create Hack/i)
    expect(element).toBeInTheDocument()
})

test('Hack heading update', () =>{
    const {getByPlaceholderText} = render (<CreateHack/>)
    const input = getByPlaceholderText("Hack Name")
    expect(input.value).toBe("")
    fireEvent.change(input, {target: {value: "Hack Zero"}})
    expect(input.value).toBe("Hack Zero");
})

test('Hack description update', () =>{
    const {getByPlaceholderText} = render (<CreateHack/>)
    const input = getByPlaceholderText("Hack Description")
    expect(input.value).toBe("")
    fireEvent.change(input, {target: {value: "This is the description of the hack"}})
    expect(input.value).toBe("This is the description of the hack");
})