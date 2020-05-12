import { configure } from 'enzyme';
import Adapter from 'enzyme-adpater-react-16';
configure({adapter: new Adapter()});

import NavBar from './Navbar'
import shallow from 'enzyme/build/shallow';

describe('<NavBar />',() => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavBar />)
    })

})
