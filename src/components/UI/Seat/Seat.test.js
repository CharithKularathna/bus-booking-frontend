import React from 'react';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';

//Connecting Enzyme
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Seat from './Seat'

describe('<Seat />',() => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<Seat />)
    })
    it("Seat Rendered",()=>{
        wrapper = shallow(<Seat type="Blank" />)
        expect(wrapper.find("btn")).toHaveLength(1)
    })


})