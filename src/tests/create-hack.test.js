import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateHack from '../components/create-hack'

test('Important info rendered', () =>{
    const {getByText} = render(<CreateHack/>)
    const element = getByText(/Create Hack/i)
    expect(element).toBeInTheDocument()
})

test('Hack heading update', () =>{
    // const { getByText, getByLabelText} = render (<CreateHack/>)
    // const input = getByLabelText('Hack Name')
    // input.value = 'The Awesome Idea'
    // fireEvent.change(input)
})

test('Hack description update', () =>{
    
})