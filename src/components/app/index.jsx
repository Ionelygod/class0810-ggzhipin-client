import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import LaobanInfo from '../laoban-info';
class App extends Component{
    render(){
        return (
            <Route path="/laobaninfo" component={LaobanInfo} />
        )
    }
}
export default App;