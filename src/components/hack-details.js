import React, { useState, useEffect} from 'react'
import Axios from 'axios'

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


function HackDetails(props){
    const classes = useStyles()

    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [goal, setGoal] = useState('')

    useEffect(()=>{
        if(props.hackID!==undefined){
            Axios.get('http://localhost:3001/addhack'+props.hackID).then(res =>{
                if(res.status === 200){
                    setData(res.data)
                } else{
                    console.log(res)
                }
            }).then(()=>{
                setTitle(data.title)
                setDescription(data.description)
                setGoal(data.goal)
            })
        }else{
            setTitle("Hack-Zero")
            setDescription("This is where the description/idea for the hack will be displayed when there is one. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus in tortor a molestie. Vestibulum congue, eros et ultricies vehicula, sapien est sollicitudin risus, ut volutpat augue tellus in neque. Aliquam erat volutpat.")
            setGoal("To win and get that dosh but also the experience")
        }
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