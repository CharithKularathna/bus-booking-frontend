import React from 'react';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';

//Connecting Enzyme
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import NavBar from './Navbar'

describe('<NavBar />',() => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavBar />)
    })
    it("Should have 3 NavLinks if not Authenticated",()=>{
        expect(wrapper.find("li")).toHaveLength(3)
    })

    it("Should have 4 NavLinks if Authenticated",()=>{
        wrapper = shallow(<NavBar isAuthenticated />)
        expect(wrapper.find("li")).toHaveLength(3)
    })

})
