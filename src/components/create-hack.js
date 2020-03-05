import React, {useState} from "react"

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    field: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      width: '90vw',
    },
    button: {
        margin: theme.spacing(1)
    }
  }));


function CreateHack(){

    const classes = useStyles()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)

    const handleChange = event =>{
        if(event.target.name === 'title'){
            setTitle(event.target.value)
        } else{
            setDescription(event.target.value)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        setShow(true)
        const obj = {
            title: title,
            description: description,
            goal: "temp"
        }
        // Axios.post('http://localhost:3001/addhack',obj).then(res =>{
        //     console.log(res)
        // })
    }

    const renderHack = () =>{
        if(show === true){
            return(
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                    alignContent="center">
                    <Paper elevation={2}>
                        <Typography alt='title' variant="h2" component="h2">
                            {title}
                        </Typography>
                        <Typography alt='description' variant="h4" component="h4">
                            {description}
                        </Typography>
                    </Paper>
                </Grid>
            )
        }
        return null
    }

    return(
        <div className={classes.root}>
            <form width={1} noValidate autoComplete='false' onSubmit={handleSubmit}>
                <Grid container
                direction="column"
                justify="center"
                alignItems="stretch"
                alignContent="center">
                    <Grid className={classes.field} item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-amount'>Hack Name</InputLabel>
                            <OutlinedInput
                                placeholder="Hack Name"
                                name='title'
                                onChange={handleChange}
                                value={title}
                                labelWidth={85}>
                            </OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.field} item xs>
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-amount'>Hack Description</InputLabel>
                            <OutlinedInput
                                placeholder="Hack Description"
                                name='description'
                                onChange={handleChange}
                                value={description}
                                multiline
                                rows={5}
                                labelWidth={125}>
                            </OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <Button type='submit' className={classes.button} variant='contained' color='primary'>
                            Create Hack
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {renderHack()}
        </div>
    )
}

export default CreateHack