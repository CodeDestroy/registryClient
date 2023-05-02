import { React, useState, useContext, useEffect }from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Context } from '../';
import { observer } from 'mobx-react-lite';
import { Container, Button, Typography, Toolbar, Box, AppBar, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, 
  Table, Paper, TextField, Select, FormControl, MenuItem, InputLabel  } from '@mui/material';
import { DataGrid, ruRU as RU } from '@mui/x-data-grid';

import { InputMask } from 'react-input-mask'
import DataService from '../services/DataService'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ru from 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import './RegistrInterPnevm.css'

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

//accordion
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  

  
  function RegistrInterPnevm() {
    const [courses, setCourses] = useState([])
    
    useEffect(() => {
        console.log(store.user)
        DataService.fetchRowsRegInterPnevm().then((res) => {
            setRows(res.data)
        })
        DataService.fetchCourseName().then((res) => {
            setCourses(res.data)
        })
    
        
    }, [])
    const [rows, setRows] = useState([])
    const { store } = useContext(Context);

    //table
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 15},
        { field: 'secondName', headerName: 'Фамилия', minWidth: 170 },
        { field: 'firstName', headerName: 'Имя', minWidth: 170 },
        { field: 'patronomicName', headerName: 'Отчество', minWidth: 100 },
        {
        field: 'birthDate',
        headerName: 'Дата рождения',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'addressFact',
        headerName: 'Адрес фактического проживания',
        minWidth: 370,
        editable: true,
        },
        {
        field: 'phone',
        headerName: 'Телефон',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'lastHospitalizationDate',
        headerName: 'Дата последней госпитализации',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'height',
        headerName: 'Рост пациента',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'weight',
        headerName: 'Вес пациента',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'pneumoniaType',
        headerName: 'Картина соответствует',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'mMRS',
        headerName: 'mMRS',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'FJELoriginal',
        headerName: 'Уровень ФЖЕЛ (исходный)',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'DLCOoriginal',
        headerName: 'Уровень DLCO (исходный)',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'flowType',
        headerName: 'Вариант течения',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'courseName',
        headerName: 'Препарат',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'initTherapyDate',
        headerName: 'Дата иницилизации лекарственной терапии',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'controlVisitNumber',
        headerName: 'Номер визита',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'controlVisitDate',
        headerName: 'Дата визита',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'mMRScontrol',
        headerName: 'mMRS',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'FJELcontrol',
        headerName: 'Уровень ФЖЕЛ',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'DLCOcontrol',
        headerName: 'Уровень DLCO',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'comments',
        headerName: 'Комментарии',
        minWidth: 170,
        editable: true,
        },
    ];

    //table Sticky header
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    let date = new Date();
     
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //accordion
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



     
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [patronomic, setPatronomic] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [addressFact, setAddressFact] = useState('');
    const [phone, setPhone] = useState('');
    const [lastHospitalizationDate, setLastHospitalizationDate] = useState(new Date());  
    const [height, setHeight] = useState('');  
    const [weight, setWeight] = useState('');
    const [pneumoniaType, setPneumoniaType] = useState('');
    const [mMRS, setMMRS] = useState('');
    const [FJELoriginal, setFJELoriginal] = useState('');
    const [DLCOoriginal, setDLCOoriginal] = useState('');
    const [flowType, setFlowType] = useState('');
    const [courseName, setCourseName] = useState('');
    const [initTherapyDate, setInitTherapyDate] = useState('');
    const [controlVisitNumber, setControlVisitNumber] = useState('');
    const [mMRScontrol, setMMRScontrol] = useState('');
    const [FJELcontrol, setFJELcontrol] = useState('');
    const [DLCOcontrol, setDLCOcontrol] = useState('');
    const [comments, setComments] = useState('');
    
    
    //select
    const handleChangeSelectPneumoniaType = (event) => {
        setPneumoniaType(event.target.value);
    };
    const handleChangeSelectFlowType = (event) => {
        setFlowType(event.target.value);
    };
    const handleChangeSelectCourseName = (event) => {
        setCourseName(event.target.value);
    };



    // const sendDataRegInterPnevm = () => {
    //     DataService.sendDataRegInterPnevm(secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, pneumoniaType, mMRS, 
    //         FJELoriginal, DLCOoriginal, flowType, courseName, initTherapyDate, controlVisitNumber, mMRScontrol, FJELcontrol, DLCOcontrol, comments)
    //     .then((res) => {
    //         alert('Успешно!')
    //         setName('');
    //         setSecondName('');
    //         setPatronomic('');
    //         setBirthDate(new Date());         
    //         setAddressFact('');         
    //         setPhone('');
    //         setLastHospitalizationDate(new Date());  
    //         setHeight('');  
    //         setWeight('');
    //         setPneumoniaType('');
    //         setMMRS('');
    //         setFJELoriginal('');
    //         setDLCOoriginal('');
    //         setFlowType('');
    //         setCourseName('');
    //         setInitTherapyDate('');
    //         setControlVisitNumber('');
    //         setMMRScontrol('');
    //         setFJELcontrol('');
    //         setDLCOcontrol('');
    //         setComments('');
       
    //         DataService.fetchRowsRegInterPnevm().then((res) => {
    //             setRows(res.data)
    //         })
    //     })
    // }
    const logout  = () => {
        store.logout();
        window.location.reload(false);
    } 

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <StyledToolbar>
                    <Grid container spacing={2} style={{display: 'flex'}}>
                        <Grid item xs={12} style={{textAlign: 'end'}}>
                            <h4 style={{marginLeft: 'auto', marginRight: '5rem', fontSize: '1.7rem', fontWeight: '400'}}>
                                Регистр пациентов, страдающих интерстициальными пневмониями
                            </h4>
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
                            <Button style={{marginLeft: 'auto', textTransform: 'none'}} href={Pamyatka} target="_blank" className = "button-header">Памятка</Button>
                            <Button style={{marginRight: '5rem', textTransform: 'none'}} className = "button-header" onClick={logout}>Выйти</Button>
                        </Grid>
                    </Grid>
                </StyledToolbar>
            </AppBar>
        </Box>
        <Container component="main" style={{maxWidth: '2560px'}}>
            <Box sx={{ height: 800, width: '100%', marginTop: '4rem' }}>
                <Typography variant="subtitle1"  sx={{ flexGrow: 1 }} style={{marginBottom: '1rem'}}>              
                    {date.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <DataGrid
                    localeText={RU.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 15,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{marginTop: 5}}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Ввести новые данные в регистр</Typography>
                </AccordionSummary>
                <AccordionDetails>
               
                    <Typography>
                        <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' }, }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="surname-inp"
                            label="Фамилия"                                
                            variant="standard"
                            value={secondName}
                            onChange={e => {setSecondName(e.target.value)}}
                        />
                        <TextField
                            id="name-inp"
                            label="Имя"                
                            variant="standard"
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                        />
                        <TextField
                            id="patronomic-inp"
                            label="Отчество"                                
                            variant="standard"
                            value={patronomic}
                            onChange={e => {setPatronomic(e.target.value)}}
                        />
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                            >
                            <DatePicker 
                                defaultValue={dayjs(new Date())}
                                label="Дата рождения"
                                mask="__-__-____"
                                format="DD.MM.YYYY"
                                onChange={(newValue) => {
                                    setBirthDate(newValue);
                                }}/>
                        </LocalizationProvider>;
                        <TextField
                            id="adress-inp"
                            label="Адрес фактического проживания"  
                            variant="standard"
                            value={addressFact}
                            onChange={e => {setAddressFact(e.target.value)}}
                        />   
                        <TextField
                            id="phone-inp"
                            label="Телефон"
                            variant="standard"
                            value={phone}
                            onChange={e => {setPhone(e.target.value)}}
                        />                   
                        {/* <TextField
                            id="phone-inp"
                            label="Дата последней госпитализации"
                            variant="standard"
                            value={lastHospitalizationDate}
                            onChange={e => {setLastHospitalizationDate(e.target.value)}}
                        /> */}
                        <TextField
                            id="height-inp"
                            label="Рост"
                            variant="standard"
                            value={height}
                            onChange={e => {setHeight(e.target.value)}}
                        />     
                        <TextField
                            id="weight-inp"
                            label="Вес"
                            variant="standard"
                            value={weight}
                            onChange={e => {setWeight(e.target.value)}}
                        />        
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="pneumoniaType-lab">Картина соответствует</InputLabel>
                            <Select
                            labelId="pneumoniaType-lab"
                            id="pneumoniaType-inp"
                            value={pneumoniaType}
                            onChange={handleChangeSelectPneumoniaType}
                            label="Картина соответствует"
                            >                           
                            <MenuItem value={1}>Обычной интерстициальной пневмонии</MenuItem>
                            <MenuItem value={2}>Вероятной интерстициальной пневмонии</MenuItem>                           
                            </Select>
                        </FormControl>
                        <TextField
                            id="mMRS-inp"
                            label="mMRS"
                            variant="standard"
                            value={mMRS}
                            onChange={e => {setMMRS(e.target.value)}}
                        /> 
                        <TextField
                            id="FJELoriginal-inp"
                            label="Уровень ФЖЕЛ (исходный)"
                            variant="standard"
                            value={FJELoriginal}
                            onChange={e => {setFJELoriginal(e.target.value)}}
                        />
                        <TextField
                            id="DLCOoriginal-inp"
                            label="Уровень DLCO (исходный)"
                            variant="standard"
                            value={DLCOoriginal}
                            onChange={e => {setDLCOoriginal(e.target.value)}}
                        />                       
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="flowType-lab">Вариант течения</InputLabel>
                            <Select
                            labelId="flowType-lab"
                            id="flowType-inp"
                            value={flowType}
                            onChange={handleChangeSelectFlowType}
                            label="Вариант течения"
                            >                           
                            <MenuItem value={1}>Идиопатический легочный фиброз</MenuItem>
                            <MenuItem value={2}>Интерстициальное заболевание с фиброзированием, неуточненное</MenuItem>    
                            <MenuItem value={3}>Интерстициальное заболевание с фиброзированием, ассоциированное с системным заболеванием соединительной ткани</MenuItem>                          
                            </Select>
                        </FormControl>                     
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="courseName-lab">Препарат</InputLabel>
                            <Select
                            labelId="courseName-lab"
                            id="courseName-inp"
                            value={courseName}
                            onChange={handleChangeSelectCourseName}
                            label="Препарат"
                            >                                            
                            <MenuItem value={1}>Пирфенидон</MenuItem>
                            <MenuItem value={2}>Нинтеданиб</MenuItem>       
                            <MenuItem value={3}>Без препарата</MenuItem>                                                      
                            </Select>
                        </FormControl>
                        {/* <TextField
                            id="initTherapyDate-inp"
                            label="Дата инициации лекарственной терапии"
                            variant="standard"
                            value={initTherapyDate}
                            onChange={e => {setInitTherapyDate(e.target.value)}}
                        /> */}
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                            >
                            <DatePicker 
                                defaultValue={dayjs(new Date())}
                                label="Дата инициации лекарственной терапии"
                                mask="__-__-____"
                                format="DD.MM.YYYY"
                                onChange={(newValue) => {
                                    setInitTherapyDate(newValue);
                                }}
                            />
                        </LocalizationProvider>;
                        <TextField
                            id="controlVisitNumber-inp"
                            label="Номер визита"
                            variant="standard"
                            value={controlVisitNumber}
                            onChange={e => {setControlVisitNumber(e.target.value)}}
                        />
                        <TextField
                            id="mMRScontrol-inp"
                            label="mMRS"
                            variant="standard"
                            value={mMRScontrol}
                            onChange={e => {setMMRScontrol(e.target.value)}}
                        />
                        <TextField
                            id="FJELcontrol-inp"
                            label="Уровень ФЖЕЛ"
                            variant="standard"
                            value={FJELcontrol}
                            onChange={e => {setFJELcontrol(e.target.value)}}
                        />
                        <TextField
                            id="DLCOcontrol-inp"
                            label="Уровень DLCO"
                            variant="standard"
                            value={DLCOcontrol}
                            onChange={e => {setDLCOcontrol(e.target.value)}}
                        />
                        <TextField
                            id="comments-inp"
                            label="Комментарии"
                            variant="standard"
                            value={comments}
                            onChange={e => {setComments(e.target.value)}}
                        />
                        </Box>
                      
                        <Button variant="contained" disableElevation sx={{ marginLeft: '65em' }} onClick={sendDataRegInterPnevm}>
                            Внести данные
                        </Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>
      
        </Container>
      </>
    )
  }
  
  export default observer(RegistrInterPnevm)