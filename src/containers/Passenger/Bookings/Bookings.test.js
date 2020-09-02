import React from 'react';

import { mount } from 'enzyme';
import { configure } from 'enzyme';

//Connecting Enzyme
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Bookings from './Bookings'

describe('<Bookings />',() => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = mount(<Bookings />)
    })
    it("Table Rendered with No Records",()=>{
        //expect(wrapper.find("li")).toHaveLength(0)
    })
    it("Table Rendered with No Records",()=>{
        //expect(wrapper.find("table")).toHaveLength(1)
    })


})