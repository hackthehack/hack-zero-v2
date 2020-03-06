import React, { useState, useEffect} from 'react'

// UI imports
import { 
    Grid,
    Typography,
    Paper,
    Button,
    Chip
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const useStyles = makeStyles(theme =>({
    root:{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    rightFeild:{
        textAlign: "right"
    }
}))


function HackDetails(){
    const classes = useStyles()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [goal, setGoal] = useState('')

    useEffect(()=>{
        setTitle("Hack-Zero")
        setDescription("Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.")
        setGoal("To win and get that cash")

    })

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            alignContent="center">
            <Paper className={classes.root}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    alignContent="center"
                    spacing={1}>
                    <Grid item xs={10}>
                    <Chip
                        icon={<ErrorOutlineOutlinedIcon />}
                        label="status"
                        color="secondary"/>
                    </Grid>
                    <Grid item xs={2} className={classes.rightFeild}>
                        <Button variant='contained' color='primary'>
                            Join Hack
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Idea:
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Goal:
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='body1'>
                            {goal}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Team:
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default HackDetails