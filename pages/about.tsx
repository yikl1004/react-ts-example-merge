import React, { Fragment } from 'react'
import { PageHeader } from 'antd';


const About = () => (
  <Fragment>
    <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle" />,
    <div>
      This is About Page!!!
    </div>
  </Fragment>
)

export default About
