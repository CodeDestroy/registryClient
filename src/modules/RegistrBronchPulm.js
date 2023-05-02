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


function RegistrBronchPulm() {
    const [allergIllness, setAllergIllness] = useState([])    
    const [choicePreparatOnBitS, setChoicePreparatOnBit] = useState([]);
    const [bazisTherapy, setBazisTherapy] = useState([]);
    const [baCourseIllnes, setBaCourseIllness] = useState([]);
    const [cardioPatolog, setCardioPatolog] = useState([]);
    

    useEffect(() => {
        console.log(store.user)
        DataService.fetchRowsRegBronchPulm().then((res) => {
            setRows(res.data)
        })
        DataService.fetchAllergIllness().then((res) => {
            setAllergIllness(res.data)
        })
        DataService.fetchChoicePreparatOnBit().then((res) => {
            setChoicePreparatOnBit(res.data)
        })
       
        DataService.fetchBazisTherapy().then((res) => {
            setBazisTherapy(res.data)
        })
        DataService.fetchBaCourseIllness().then((res) => {
            setBaCourseIllness(res.data)
        })
        DataService.fetchCardioPatolog().then((res) => {
            setCardioPatolog(res.data)
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
        field: 'address',
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
        field: 'heaviness',
        headerName: 'Тяжесть',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'controlDegree',
        headerName: 'Степень контроля',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'escalation',
        headerName: 'Обострение',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'breath_heaviness',
        headerName: 'Дыхательная недостаточность',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'th2',
        headerName: 'Тип Th2 воспаления:',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'eozinophilia',
        headerName: 'Эозинофилия',
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
        field: 'IgE',
        headerName: 'Общий IgE',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'allergAnamnez',
        headerName: 'Сопутствующий аллергологический анамнез',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'allerg_illness_id',
        headerName: 'Наличие сопутствующих заболеваний, подтверждающих аллергический характер. Воспаления:',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'choice_preparat_on_bit_id',
        headerName: 'Выбор препарата на БИТ',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'dozaOnBIT',
        headerName: 'Расчет дозы препарата на БИТ',
        minWidth: 170,
        editable: true,
        },
       {
        field: 'needReceivBIT',
        headerName: 'Пациент нуждается в получении БИТ',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'bazis_therapy_id',
        headerName: 'Базисная терапия:',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'quanDozKDBA',
        headerName: 'Количество доз КДБА в сутки',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'ba_course_illness_id',
        headerName: 'Наличие сопутствующих заболеваний, влияющих на течение БА',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'controlAfterThreeMonths',
        headerName: 'Контроль течения (через 3 месяца)',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'SRB',
        headerName: 'Уровень СРБ',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'gipercoagulation',
        headerName: 'Наличие гиперкоагуляции',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'cardio_patolog_id',
        headerName: 'Наличие сопутствующей кардиологической патологии:',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'failureCirculation',
        headerName: 'Недостаточность кровообращения:',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'sequence',
        headerName: 'Очередность',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'dateInit',
        headerName: 'Дата инициации',
        minWidth: 170,
        editable: true,
        },
        {
        field: 'dateControlEffect',
        headerName: 'Дата контроля эффективности',
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
    
    const [secondName, setSecondName] = useState('');
    const [name, setName] = useState('');    
    const [patronomic, setPatronomic] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [addressFact, setAddressFact] = useState('');
    const [phone, setPhone] = useState('');
    const [lastHospitalizationDate, setLastHospitalizationDate] = useState(new Date());  
    const [height, setHeight] = useState(0);  
    const [weight, setWeight] = useState(0);
    const [heaviness, setHeaviness ] = useState('');
    const [controlDegree, setControlDegree] = useState('');
    const [escalation, setEscalation] = useState('');
    const [breath_heaviness, setBreath_heaviness] = useState('');
    const [th2, setTh2] = useState('');
    const [eozinophilia, setEozinophilia] = useState('');
    const [IgE, setIgE] = useState('');
    const [allergAnamnez, setAllergAnamnez] = useState(''); 
    /////////////////
    const [allergIllnessId, setAllergIllnessId] = useState('')
    

    const [choicePreparatOnBitId, setChoicePreparatOnBitId] = useState('');
    const [bazisTherapyId, setBazisTherapyId] = useState('');
    const [baCourseIllnessId, setBaCourseIllnessId] = useState('');
    const [cardioPatologId, setCardioPatologId] = useState('');


    const [needReceivBIT, setNeedReceivBIT] = useState('');
    const [dozaOnBIT, setDozaOnBIT] = useState('');    
    const [quanDozKDBA, setQuanDozKDBA] = useState('');    
    const [controlAfterThreeMonths, setControlAfterThreeMonths] = useState('');
    const [SRB, setSRB] = useState('');
    const [gipercoagulation, setGipercoagulation] = useState('');    
    const [failureCirculation, setFailureCirculation] = useState('');
    const [sequence, setSequence] = useState('');
    const [dateInit, setDateInit] = useState(new Date());
    const [dateControlEffect, setDateControlEffect] = useState(new Date());
    
   //select

    const handleChangeHeaviness = (event) => {
        setHeaviness(event.target.value);
    };
    const handleChangeControlDegree = (event) => {
        setControlDegree(event.target.value);
    };
    const handleChangeEscalation = (event) => {
        setEscalation(event.target.value);
    };
    const handleChangeBreathHeaviness = (event) => {
        setBreath_heaviness(event.target.value);
    };
    const handleChangeTh2 = (event) => {
        setTh2(event.target.value);
    };
    const handleChangeAllergAnamnez = (event) => {
        setAllergAnamnez(event.target.value);
    };
    const handleChangeAllergIllness = (event) => {
        setAllergIllnessId(event.target.value);
    };
    const handleChageNeedReceivBIT = (event) =>  {
        setNeedReceivBIT(event.target.value)
    };
    const handleChangePreparatOnBit = (event) => {
        setChoicePreparatOnBitId(event.target.value);
    };
    const handleChangeBazisTherapy = (event) => {
        setBazisTherapyId(event.target.value);
    };
    const handleChangeBaCourseIllness = (event) => {
        setBaCourseIllnessId(event.target.value);
    };
    const handleChangeGipercoagulation = (event) => {
        setGipercoagulation(event.target.value);
    };
    const handleChangeCardioPatolog = (event) => {
        setCardioPatologId(event.target.value);
    };
    const handleChangeFailureCirculation = (event) => {
        setFailureCirculation(event.target.value);
    };
  


    const sendDataRegBronchPulm = () => {
        DataService.sendDataRegBronchPulm(secondName, name, patronomic, birthDate, addressFact, phone, lastHospitalizationDate, height, weight, 
            heaviness, controlDegree, escalation, breath_heaviness, th2, eozinophilia, IgE, allergAnamnez, allergIllnessId, 
            choicePreparatOnBitId, dozaOnBIT, needReceivBIT, bazisTherapyId, quanDozKDBA, baCourseIllnessId, controlAfterThreeMonths, 
            SRB, gipercoagulation, cardioPatologId, failureCirculation, sequence, dateInit, dateControlEffect)
        .then((res) => {
           alert('Успешно!')
           setName('');
           setSecondName('');
           setPatronomic('');
           setBirthDate(new Date());         
           setAddressFact('');         
           setPhone('');
           setLastHospitalizationDate(new Date());  
           setHeight(0);  
           setWeight(0);
           setHeaviness('');
           setControlDegree('');
           setEscalation('');
           setBreath_heaviness('');
           setTh2('');
           setEozinophilia('');
           setIgE('');
           setAllergAnamnez('');
           setAllergIllnessId('');
           setChoicePreparatOnBitId('');
           setDozaOnBIT('');
           setNeedReceivBIT('');
           setBazisTherapyId('');
           setQuanDozKDBA('');
           setBaCourseIllnessId('');
           setControlAfterThreeMonths('');
           setSRB('');
           setGipercoagulation('');
           setCardioPatologId('');
           setFailureCirculation('');
           setSequence('');
           setDateInit(new Date());
           setDateControlEffect(new Date());
      
           DataService.fetchRowsRegBronchPulm().then((res) => {
               setRows(res.data)
           })
       })
   }

   //logout page
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
                                Регистр пациентов, страдающих бронхиальной астмой пневмониями
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
                            </LocalizationProvider>
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
                                <InputLabel id="heaviness-lab">Тяжесть</InputLabel>
                                <Select
                                labelId="heaviness-lab"
                                id="heaviness-inp"
                                value={heaviness}
                                onChange={handleChangeHeaviness}
                                label="Тяжесть"
                                >                           
                                <MenuItem value={'Среднетяжелое'}>Среднетяжелое</MenuItem>
                                <MenuItem value={'Тяжелое'}>Тяжелое</MenuItem>                           
                                </Select>
                            </FormControl>
                         
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="controlDegree-lab">Степень контроля:</InputLabel>
                                <Select
                                labelId="controlDegree-lab"
                                id="controlDegree-inp"
                                value={controlDegree}
                                onChange={handleChangeControlDegree}
                                label="Степень контроля:"
                                >                           
                                <MenuItem value={'Контролируемое'}>Контролируемое</MenuItem>
                                <MenuItem value={'Частично контролируемое'}>Частично контролируемое</MenuItem>  
                                <MenuItem value={'Неконтролируемое'}>Неконтролируемое</MenuItem>                                               
                                </Select>
                            </FormControl>
                          
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="escalation-lab">Обострение</InputLabel>
                                <Select
                                labelId="escalation-lab"
                                id="escalation-inp"
                                value={escalation}
                                onChange={handleChangeEscalation}
                                label="Обострение"
                                >                           
                                <MenuItem value={'Вне обострения'}>Вне обострения</MenuItem>
                                <MenuItem value={'Легкое'}>Легкое</MenuItem>  
                                <MenuItem value={'Среднетяжелое'}>Среднетяжелое</MenuItem>  
                                <MenuItem value={'Жизнеугрожающее'}>Жизнеугрожающее</MenuItem>   
                                <MenuItem value={'Фатальное'}>Фатальное</MenuItem>                                                
                                </Select>
                            </FormControl>
                                                        
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="breath_heaviness-lab">Дыхательная недостаточность</InputLabel>
                                <Select
                                labelId="breath_heaviness-lab"
                                id="breath_heaviness-inp"
                                value={breath_heaviness}
                                onChange={handleChangeBreathHeaviness}
                                label="Дыхательная недостаточность"
                                >                           
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>  
                                <MenuItem value={2}>2</MenuItem>                                                                                 
                                </Select>
                            </FormControl>
                           
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="th2-lab">Тип Th2 воспаления:</InputLabel>
                                <Select
                                labelId="th2-lab"
                                id="th2-inp"
                                value={th2}
                                onChange={handleChangeTh2}
                                label="Тип Th2 воспаления:"
                                >                           
                                <MenuItem value={'Подтвержден'}>Подтвержден</MenuItem>
                                <MenuItem value={'Не подтвержден'}>Не подтвержден</MenuItem>                                                                                                              
                                </Select>
                            </FormControl>

                            <TextField
                                id="eozinophilia-inp"
                                label="Эозинофилия"
                                variant="standard"
                                value={eozinophilia}
                                onChange={e => {setEozinophilia(e.target.value)}}
                            />   
                            <TextField
                                id="IgE-inp"
                                label="Общий IgE"
                                variant="standard"
                                value={IgE}
                                onChange={e => {setIgE(e.target.value)}}
                            />   
                           
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="allergAnamnez-lab">Сопутствующий аллергологический анамнез</InputLabel>
                                <Select
                                labelId="allergAnamnez-lab"
                                id="allergAnamnez-inp"
                                value={allergAnamnez}
                                onChange={handleChangeAllergAnamnez}
                                label="Сопутствующий аллергологический анамнез"
                                >                           
                                <MenuItem value={'Отягощен'}>Отягощен</MenuItem>
                                <MenuItem value={'Не отягощен'}>Не отягощен</MenuItem>                                                                                                              
                                </Select>
                            </FormControl>
                                    
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="allerg_illness_id-lab">Наличие сопутствующих заболеваний, подтверждающих аллергический характер. Воспаления:</InputLabel>
                                <Select
                                labelId="allerg_illness_id-lab"
                                id="allerg_illness_id-inp"
                                value={allergIllnessId}
                                onChange={handleChangeAllergIllness}
                                label="Наличие сопутствующих заболеваний, подтверждающих аллергический характер. Воспаления:"
                                >       
                                {allergIllness.map(el => (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                ))}                                  
                                <MenuItem value={null}>Без препарата</MenuItem>
                                </Select>
                            </FormControl>
                          
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="choice_preparat_on_bit_id-lab">Выбор препарата на БИТ</InputLabel>
                                <Select
                                labelId="choice_preparat_on_bit_id-lab"
                                id="choice_preparat_on_bit_id-inp"
                                value={choicePreparatOnBitId}
                                onChange={handleChangePreparatOnBit}
                                label="Выбор препарата на БИТ"
                                >       
                                {choicePreparatOnBitS.map(el => (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                ))}                                  
                                <MenuItem value={null}>Без препарата</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="dozaOnBIT-inp"
                                label="Расчет дозы препарата на БИТ"
                                variant="standard"
                                value={dozaOnBIT}
                                onChange={e => {setDozaOnBIT(e.target.value)}}
                            />   

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="needReceivBIT-lab">Пациент нуждается в получении БИТ</InputLabel>
                                <Select
                                labelId="needReceivBIT-lab"
                                id="needReceivBIT-inp"
                                value={needReceivBIT}
                                onChange={handleChageNeedReceivBIT}
                                label="Пациент нуждается в получении БИТ"
                                >                           
                                <MenuItem value={true}>Да</MenuItem>
                                <MenuItem value={false}>Нет</MenuItem>                                                                                                              
                                </Select>
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="bazis_therapy_id-lab">Базисная терапия:</InputLabel>
                                <Select
                                labelId="bazis_therapy_id-lab"
                                id="bazis_therapy_id-inp"
                                value={bazisTherapyId}
                                onChange={handleChangeBazisTherapy}
                                label="Базисная терапия:"
                                >       
                                {bazisTherapy.map(el => (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                ))}                                  
                                <MenuItem value={null}>Без препарата</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="quanDozKDBA-inp"
                                label="Количество доз КДБА в сутки"
                                variant="standard"
                                value={quanDozKDBA}
                                onChange={e => {setQuanDozKDBA(e.target.value)}}
                            />      
                    
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="ba_course_illness_id-lab">Наличие сопутствующих заболеваний, влияющих на течение БА</InputLabel>
                                <Select
                                labelId="ba_course_illness_id-lab"
                                id="ba_course_illness_id-inp"
                                value={baCourseIllnessId}
                                onChange={handleChangeBaCourseIllness}
                                label="Наличие сопутствующих заболеваний, влияющих на течение БА"
                                >       
                                {baCourseIllnes.map(el => (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                ))}                                  
                                <MenuItem value={null}>Без препарата</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="controlAfterThreeMonths-inp"
                                label="Контроль течения (через 3 месяца)"
                                variant="standard"
                                value={controlAfterThreeMonths}
                                onChange={e => {setControlAfterThreeMonths(e.target.value)}}
                            /> 
                            <TextField
                                id="SRB-inp"
                                label="Уровень СРБ"
                                variant="standard"
                                value={SRB}
                                onChange={e => {setSRB(e.target.value)}}
                            /> 
                        
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="gipercoagulation-lab">Наличие гиперкоагуляции</InputLabel>
                                <Select
                                labelId="gipercoagulation-lab"
                                id="gipercoagulation-inp"
                                value={gipercoagulation}
                                onChange={handleChangeGipercoagulation}
                                label="Наличие гиперкоагуляции"
                                >                           
                                <MenuItem value={true}>Да</MenuItem>
                                <MenuItem value={false}>Нет</MenuItem>                                                                                                              
                                </Select>
                            </FormControl>
                        
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="cardio_patolog_id-lab">Наличие сопутствующей кардиологической патологии:</InputLabel>
                                <Select
                                labelId="cardio_patolog_id-lab"
                                id="cardio_patolog_id-inp"
                                value={cardioPatologId}
                                onChange={handleChangeCardioPatolog}
                                label="Наличие сопутствующей кардиологической патологии:"
                                >       
                                {cardioPatolog.map(el => (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                ))}                                  
                                <MenuItem value={null}>Без препарата</MenuItem>
                                </Select>
                            </FormControl>
                           
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="failureCirculation-lab">Недостаточность кровообращения:</InputLabel>
                                <Select
                                labelId="failureCirculation-lab"
                                id="failureCirculation-inp"
                                value={failureCirculation}
                                onChange={handleChangeFailureCirculation}
                                label="Недостаточность кровообращения:"
                                >                           
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>          
                                <MenuItem value={2}>2 А</MenuItem>
                                <MenuItem value={2}>2 Б</MenuItem>
                                <MenuItem value={3}>3</MenuItem>                                                                                                   
                                </Select>
                            </FormControl>
                            <TextField
                                id="sequence-inp"
                                label="Очередность"
                                variant="standard"
                                value={sequence}
                                onChange={e => {setSequence(e.target.value)}}
                            /> 
                        
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                                >
                                <DatePicker 
                                    defaultValue={dayjs(new Date())}
                                    label="Дата инициации"
                                    mask="__-__-____"
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => {
                                        setDateInit(newValue);
                                    }}/>
                            </LocalizationProvider>
                           
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                                >
                                <DatePicker 
                                    defaultValue={dayjs(new Date())}
                                    label="Дата контроля эффективности"
                                    mask="__-__-____"
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => {
                                        setDateControlEffect(newValue);
                                    }}/>
                            </LocalizationProvider>                            
                        </Box>
                        <Button variant="contained" disableElevation sx={{ marginLeft: '80em' }} onClick={sendDataRegBronchPulm}>
                            Внести данные
                        </Button>
                    </Typography>                    
                </AccordionDetails>
            </Accordion>
        </Container>                
    </>
  )
}

export default observer(RegistrBronchPulm)