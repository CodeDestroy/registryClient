import logo from './logo.jpg';
import './App.css';
import { React, useState, useContext, useEffect }from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Context } from './';
import { observer } from 'mobx-react-lite';
import { Container, Button, Typography, Toolbar, Box, AppBar, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, 
  Table, Paper, TextField, Select, FormControl, MenuItem, InputLabel, Link   } from '@mui/material';
import { DataGrid, ruRU as RU } from '@mui/x-data-grid';

import { InputMask } from 'react-input-mask'
import DataService from './services/DataService'
import AuthService from './services/AuthService'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ru from 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import './MainPage.css'
import Pamyatka from './Pamyatka.pdf'

//navbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'block',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
}));






function MainPage() {
    
    const [routes, setRoutes] = useState([])
    useEffect(() => {
        console.log(store.user)
        AuthService.getAccesses(store.user.id).then((res) => setRoutes(res.data))
    }, [])
    
    const { store } = useContext(Context);
    //table
    
  //table Sticky header
    let date = new Date();
    

    //accordion
    

    //select
    
    const logout  = () => {
        store.logout();
        window.location.reload(false);
    } 

  
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <StyledToolbar /* style={{display: 'flex'}} */>
                    <Grid container spacing={2} style={{display: 'flex'}}>
                        {/* <Grid item xs={1}>
                            <img style={{marginLeft: '3rem', maxHeight: '7rem'}} src={logo}/>
                        </Grid>
                        <Grid item xs={3}>
                            <h4 style={{marginLeft: '1rem', fontSize: '1.3rem', marginTop: '2.3rem', fontSize: '3rem', fontWeight: '400', marginBottom: '0'}} className='kvazar'>КВАЗАР®</h4>
                        </Grid> */}
                        <Grid item xs={12} style={{textAlign: 'end'}}>
                            <h4 style={{marginLeft: 'auto', marginRight: '5rem', fontSize: '1.7rem', fontWeight: '400'}}>
                                Реестры пациентов
                            </h4>
                            {/* <Typography variant="h6" sx={{ flexGrow: 1 }}> */}              
                                
                            {/* </Typography> */}
                        </Grid>
                        {store.user.secondName && store.user.secondName.length > 2 && 
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }} style={{fontSize: '1.3rem', marginLeft: '3rem', lineHeight: '1.35'}}>  
                                {store.user.secondName} {store.user.firstName} {store.user.patronomicName}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }} style={{fontSize: '1.3rem', marginLeft: '3rem', lineHeight: '1.35'}}>  
                                {store.user.role}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }} style={{fontSize: '1.3rem', marginLeft: '3rem', lineHeight: '1.35'}}>  
                                {store.user.district}
                            </Typography>
                        </Grid>}
                        <Grid item xs={8} style={{alignItems: 'end', display: 'flex'}}>

                            <Button style={{marginLeft: 'auto', textTransform: 'none', marginRight: '5rem'}} className = "button-header" onClick={logout}>Выйти</Button>
                        </Grid>
                    </Grid>
                </StyledToolbar>
            </AppBar>
        </Box>
        <Container component="main" style={{maxWidth: '2560px'}}>
            <Box sx={{ height: 800, width: '100%', marginTop: '4rem', display: 'flex' }}>
                {routes.length > 0 &&
                    routes.map((route) =>  (
                        <Link style={{marginLeft: 'auto', marginRight: 'auto', width: '50rem', fontSize: '1.5rem'}} href={route.accessRegistry.alias}>{route.accessRegistry.name}</Link>
                    ))
                }
            </Box>
        </Container>

        
        </>
    );
}


export default observer(MainPage);
