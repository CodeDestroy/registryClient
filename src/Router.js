import React, { useEffect ,useContext, useState } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Mainpage from './MainPage';
import { Context } from './';
import AuthService from './services/AuthService'
import loadable from "@loadable/component";
import RegistrG35 from './modules/RegistrG35'
import RegistrInterPnevm from './modules/RegistrInterPnevm'
import RegistrBronchPulm from './modules/RegistrBronchPulm'

const LoadablePage = loadable((props) => import(`./modules/${props.page}`), {
    fallback: <div>Hello, This page is Loading...</div>,
    cacheKey: (props) => props.page
  });

function Router() {
    const [components, setComponents] = useState(new Map())

    const [routes, setRoutes] = useState([])
    const { store } = useContext(Context);
    useEffect (() => {
        if (localStorage.getItem('token')) {
        store.checkAuth();
        }
        AuthService.getAccesses(store.user.id).then((res) => setRoutes(res.data))
        
    }, [store])
/*     useEffect(() => {
        if (routes.length > 0) {
            const map = new Map();
            routes.forEach((route) => {
                switch (route.alias) {
                    
                }
                map.set(RegistrG35, route.alias)
            })
            
        }
    }, [routes]) */
    return (
        <>


            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Mainpage}/>
                    <Route exact path='/registrG35' component={RegistrG35}/>
                    <Route exact path='/registrInterPnevm' component={RegistrInterPnevm}/>
                    <Route exact path='/registrBronchPulm' component={RegistrBronchPulm}/>
                   {/*  {routes.length > 0 &&
                        routes.map(async (route) => (
                            //const module = await import(`./modules/${route.accessRegistry.component}`); 
                            //console.log(<LoadablePage page={route.accessRegistry.component}/>)
                            <Route exact path={route.accessRegistry.alias} component={RegistrG35}/>
                            <Route exact path={route.accessRegistry.alias} component={RegistrInterPnevm}/>
                            switch (route.accessRegistry.component) {
                                case 'RegistrG35':
                                    console.log(route.accessRegistry.component)
                                    return <Route exact path={route.accessRegistry.alias} component={RegistrG35}/>
                                case 'RegistrInterPnevm':
                                    console.log(route.accessRegistry.component)
                                    return <Route exact path={route.accessRegistry.alias} component={RegistrInterPnevm}/>
                            }
                            
                        ))

                    } */}
                </Switch>
            </BrowserRouter>
        </>
        
    )
}

export default Router