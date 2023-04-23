import logo from './logo.svg';
import './App.css';
import { React, useState, useContext, useEffect }from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Context } from './';
import { observer } from 'mobx-react-lite';
import { Container, Button, Typography, Toolbar, Box, AppBar, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, 
  Table, Paper, TextField, Select, FormControl, MenuItem, InputLabel  } from '@mui/material';
import { DataGrid, ruRU as RU } from '@mui/x-data-grid';

import { InputMask } from 'react-input-mask'
import DataService from './services/DataService'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ru from 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';


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


function MainPage() {
    const [PITRS, setPITRS] = useState([])
    const [courses, setCourses] = useState([])
    const [cities, setCities] = useState([])
    const [polyclinics, setPolyclinics] = useState([])
    useEffect(() => {
        DataService.fetchRows().then((res) => {
            setRows(res.data)
        })
        DataService.fetchCity().then((res) => {
            setCities(res.data)
        })
        DataService.fetchPolyclinics().then((res) => {
            setPolyclinics(res.data)
        })
        DataService.fetchCourses().then((res) => {
            setCourses(res.data)
        })
        DataService.fetchPITRS().then((res) => {
            setPITRS(res.data)
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
        field: 'city_name',
        headerName: 'Город/Район',
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
        field: 'polyclinic_name',
        headerName: 'Поликлиника №',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'phone',
        headerName: 'Телефон',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'invalid',
        headerName: 'Инвалидность',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'course_name',
        headerName: 'Течение',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'edss',
        headerName: 'EDSS',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'PITRS_name',
        headerName: 'ПИТРС',
        minWidth: 270,
        editable: true,
        },
        {
        field: 'therapy',
        headerName: 'Терапия ПИТРС (хронология)',
        minWidth: 370,
        editable: true,
        },
        {
        field: 'diagnozDate',
        headerName: 'Дата постановки диагноза',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'mrt',
        headerName: 'МРТ',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'vipiski',
        headerName: 'Выписки',
        minWidth: 370,
        editable: true,
        },
        {
        field: 'comments',
        headerName: 'Комментарии',
        minWidth: 370,
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
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    //select
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [patronomic, setPatronomic] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [city, setCity] = useState('');
    const [addressFact, setAddressFact] = useState('');
    const [policlinica, setPoliclinica] = useState('');
    const [phone, setPhone] = useState('');
    const [invalid, setInvalid] = useState('');  
    const [course, setCourse] = useState('');  
    const [edss, setEdss] = useState('');
    const [pitrs, setPitrs] = useState('');
    const [therapyPitrs, setTherapyPitrs] = useState('');
    const [diagnozDate, setDiagnozDate] = useState(new Date());
    const [mrt, setMrt] = useState('');
    const [vipiski, setVipiski] = useState('');
    const [comments, setComments] = useState('');


    const handleChangeSelectCities = (event) => {
        setCity(event.target.value);
    };
    const handleChangeSelectPolic = (event) => {
        setPoliclinica(event.target.value);
    };
    const handleChangeSelectCourse = (event) => {
        setCourse(event.target.value);
    };
    const handleChangeSelectPITRS = (event) => {
        setPitrs(event.target.value);
    };
    const handleChangeSelectInvalid = (event) => {
        setInvalid(event.target.value);
    };
    const handleChangeSelectEDSS = (event) => {
        setEdss(event.target.value);
    };

    const sendData = () => {
        DataService.sendData(secondName, name, patronomic, birthDate, city, addressFact, policlinica, phone, invalid, course, edss, pitrs, therapyPitrs, diagnozDate, mrt, vipiski, comments)
        .then((res) => {
            alert('Успешно!')
            setName('');
            setSecondName('');
            setPatronomic('');
            setBirthDate(new Date());
            setCity('');
            setAddressFact('');
            setPoliclinica('');
            setPhone('');
            setInvalid('');  
            setCourse('');  
            setEdss('');
            setPitrs('');
            setTherapyPitrs('');
            setDiagnozDate(new Date());
            setMrt('');
            setVipiski('');
            setComments('');
            DataService.fetchRows().then((res) => {
                setRows(res.data)
            })
        })
    }

  
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <StyledToolbar>
                    <Typography variant="h6"  sx={{ flexGrow: 1 }}>              
                    Реестр пациентов, страдающих рассеяным склерозом (G35) (Воронежская область)
                    </Typography>
                    <Typography variant="subtitle2"  sx={{ flexGrow: 1 }}>              
                    {date.toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1"  sx={{ flexGrow: 1 }}>  
                    Чуприна Светлана Евгеньевна,            
                    ГВС по неврологии, Воронежская область
                    </Typography>
                    <Button style={{color: '#8f8f8f', marginTop: '1rem', fontSize: '1.2rem', textDecoration: 'underline'}} onClick={store.logout}>Выйти</Button>
                </StyledToolbar>
            </AppBar>
        </Box>
        <Container component="main">

        <Box sx={{ height: 800, width: '100%', marginTop: '5rem' }}>
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
            {/* <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5, flexDirection: 'column', alignItems: 'center'}}>
            <TableContainer sx={{ maxHeight: 800 }} className="my-5 mx-5">
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="span"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>  */} 

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
                {/* <TextField
                    id="birth-inp"
                    label="Дата рождения"
                    variant="standard"
                    value={birthDate}
                    onChange={e => {setBirthDate(e.target.value)}}
                /> */}
                                            
                {cities.length > 0 &&
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="city-sel">Город/Район</InputLabel>
                    <Select
                    labelId="city-lab"
                    id="city-sel"
                    value={city}
                    onChange={handleChangeSelectCities}
                    label="Город/Район"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {cities.map((city) => (
                            <MenuItem value={city.id}>{city.city_name}</MenuItem>
                        ))}
                        {/* {cities.length > 1 && cities.forEach(city => <MenuItem value={city.id}>{city.city_name}</MenuItem>)} */}
                    
                    </Select>
                </FormControl>}
                <TextField
                    id="adress-inp"
                    label="Адрес фактического проживания"  
                    variant="standard"
                    value={addressFact}
                    onChange={e => {setAddressFact(e.target.value)}}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="policlinica-inp">Поликлиника №</InputLabel>
                    <Select
                    labelId="policlinica-lab"
                    id="policlinica-inp"
                    value={policlinica}
                    onChange={handleChangeSelectPolic}
                    label="Поликлиника №"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {polyclinics.map(el => (
                        <MenuItem value={el.id}>{el.polyclinic_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <TextField
                    id="phone-inp"
                    label="Телефон"
                    variant="standard"
                    value={phone}
                    onChange={e => {setPhone(e.target.value)}}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="inval-lab">Инвалидность</InputLabel>
                    <Select
                    labelId="inval-lab"
                    id="inval-inp"
                    value={invalid}
                    onChange={handleChangeSelectInvalid}
                    label="Течение"
                    >
                    <MenuItem value={null}>
                        <em>Отсутствует</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>                  
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="course-lab">Течение</InputLabel>
                    <Select
                    labelId="course-lab"
                    id="course-inp"
                    value={course}
                    onChange={handleChangeSelectCourse}
                    label="Течение"
                    >
                    <MenuItem value="">
                        <em>Пусто</em>
                    </MenuItem>
                    {courses.map(el => (
                        <MenuItem value={el.id}>{el.course_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {/* <TextField
                    id="edss-inp"
                    label="EDSS"   
                    variant="standard"
                />   */}       
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="edss-lab">EDSS</InputLabel>
                    <Select
                    labelId="edss-lab"
                    id="edss-inp"
                    value={edss}
                    onChange={handleChangeSelectEDSS}
                    label="EDSS"
                    >
                    <MenuItem value={null}>
                        0
                    </MenuItem>
                    <MenuItem value={0.5}>0.5</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>        
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={2.5}>2.5</MenuItem>
                    <MenuItem value={3}>3</MenuItem>   
                    <MenuItem value={3.5}>3.5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={4.5}>4.5</MenuItem>   
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={5.5}>5.5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={6.5}>6.5</MenuItem>          
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={7.5}>7.5</MenuItem>         
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={8.5}>8.5</MenuItem>         
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={9.5}>9.5</MenuItem>            
                    </Select>
                </FormControl>     
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="pitrs-lab">ПИТРС</InputLabel>
                    <Select
                    labelId="pitrs-lab"
                    id="pitrs-inp"
                    value={pitrs}
                    onChange={handleChangeSelectPITRS}
                    label="ПИТРС"
                    >
                    <MenuItem value="">
                        <em>Пусто</em>
                    </MenuItem>
                    {PITRS.map(el => (
                        <MenuItem value={el.id}>{el.PITRS_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <TextField
                    id="ter-inp"
                    label="Терапия ПИТРС (хронология)"
                    variant="standard"
                    value={therapyPitrs}
                    onChange={e => {setTherapyPitrs(e.target.value)}}
                />
{/*                 <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    label="Дата постановки диагноза"
                    adapterLocale={ru}
                    inputFormat="dd-MM-yyyy"
                    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                    value={diagnozDate}
                    onChange={e => {setDiagnozDate(e.target.value)}}
                    >
                    <DatePicker />
                </LocalizationProvider> */}
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                    <DatePicker 
                        defaultValue={dayjs(new Date())}
                        label="Дата постановки диагноза"
                        mask="__-__-____"
                        format="DD.MM.YYYY"
                        onChange={(newValue) => {
                            setDiagnozDate(newValue);
                        }}
                    />
                </LocalizationProvider>;
                {/* <TextField
                    id="data-inp"
                    label="Дата постановки диагноза"  
                    variant="standard"
                    value={diagnozDate}
                    onChange={e => {setDiagnozDate(e.target.value)}}
                /> */}
                <TextField
                    id="mrt-inp"
                    label="МРТ" 
                    variant="standard"
                    value={mrt}
                    onChange={e => {setMrt(e.target.value)}}
                />
                <TextField
                    id="vipiski-inp"
                    label="Выписки"
                    variant="standard"
                    value={vipiski}
                    onChange={e => {setVipiski(e.target.value)}}
                />            
                <TextField
                    id="comments-inp"
                    label="Комментарии"
                    variant="standard"
                    value={comments}
                    onChange={e => {setComments(e.target.value)}}
                    sx={{ m: 1, minWidth: 550 }}
                />              
                </Box>
                <Button variant="contained" disableElevation sx={{ marginLeft: '65em' }} onClick={sendData}>
                    Внести данные
                </Button>
                </Typography>
            </AccordionDetails>
            </Accordion>

        </Container>

        
        </>
    );
}


export default observer(MainPage);
