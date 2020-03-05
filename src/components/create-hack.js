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

    let [, title, description, show] = useState()

    const handleChange = event =>{
        if(event.target.name === 'title'){
            title = event.target.value
        } else{
            description = event.target.value
        }
    }

    const handleClick = event => {
        show = true;
        const obj = {
            title: title,
            description: description,
            goal: "temp"
        }
        Axios.post('http://localhost:3001/addhack',obj).then(res =>{
            console.log(res)
        })


        console.log('Hack: '+title+"\nDescription: "+description)
        console.log(show)
    }

    // const renderHack = () =>{
    //     if(show === true){
    //         return(
    //             <Grid container
    //                 direction="column"
    //                 justify="center"
    //                 alignItems="stretch"
    //                 alignContent="center">
    //                 <Paper elevation={2}>
    //                     <Typography variant="h2" component="h2">
    //                         {title}
    //                     </Typography>
    //                     <Typography variant="h4" component="h4">
    //                         {description}
    //                     </Typography>
    //                 </Paper>
    //             </Grid>
    //         )
    //     }
    //     return null
    // }

    return(
        <div className={classes.root}>
            <form width={1} noValidate autoComplete='false'>
                <Grid container
                direction="column"
                justify="center"
                alignItems="stretch"
                alignContent="center">
                    <Grid className={classes.field} item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-amount'>Hack Name</InputLabel>
                            <OutlinedInput
                                name='title'
                                onChange={handleChange}
                                labelWidth={85}>
                            </OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.field} item xs>
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-amount'>Hack Description</InputLabel>
                            <OutlinedInput
                                name='description'
                                onChange={handleChange}
                                multiline
                                rows={5}
                                labelWidth={125}>
                            </OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <Button className={classes.button} onClick={handleClick} variant='contained' color='primary'>
                            Create Hack
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default CreateHack