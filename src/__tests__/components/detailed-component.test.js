import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailedItem from '../../../src/components/Items/DetailedItem/DetailedItem';
import Link from "@material-ui/core/Link";

import {
  List,
  Paper,
  withStyles,
  ListItem,
  Typography
} from "@material-ui/core";
configure({adapter: new Adapter()});

describe('<DetailedItem />', () => {
  const wrapper = shallow(<DetailedItem />);
  it('+++ contains class component', () => {
    expect(wrapper.find('.Component-main-360').length).toBe(1);
   });

  

    
});

