import React from 'react'
import './about.css';
import about_data from '../../jsondata/about_content.json'
import json_parser from '../common/page_json_parser.js'



const About = () => { 
    return (
      <div>
        {json_parser(about_data)}
      </div>
      )
    }
export default About;