import React from "react"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    field: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    button: {
        padding: theme.spacing(2)
    }
  }));


function CreateHack(){

    const classes = useStyles()

    const handleChange = event =>{
        console.log(event.target.value)
    }

    const handleClick = event => {
        console.log("Button Clicked")
    }

    return(
        <div className={classes.root}>
            <Grid container
            direction="column"
            justify="center"
            alignItems="center">
                <form noValidate autoComplete='false'>
                    <Grid item xs={6}>
                        <TextField 
                        className={classes.field} 
                        label="Hack Name"
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        className={classes.field}
                        label="Hack Description"
                        multiline
                        rows="4"
                        onChange={handleChange}>
                        </TextField>
                    </Grid>
                    <Grid item xs>
                        <Button className={classes.button} onClick={handleClick} variant='contained' color='primary'>
                            Create Hack
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default CreateHack