import React from 'react'
import { FormControl, Input } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const FormInput = ({ messegesHandler, input, inputHandler }) => {
    return (
        <form onSubmit={messegesHandler} className='input-form'>
            <FormControl className='input-form__buttons'>
                <Input 
                    value={input} 
                    onChange={inputHandler} 
                    placeholder='Enter a messege...' 
                    className='input-form__input'
                />
                <IconButton className='input-form__icon' disabled={!input} variant="contained" type="submit" color="primary">
                    <SendIcon />
                </IconButton>
            </FormControl>
        </form>
    )
}

export default FormInput
