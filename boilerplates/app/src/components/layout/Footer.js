import React from 'react'
import config from '../../config'
import styled from 'styled-components'

const Root = styled.div`
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    font-size: 12px;
    color: #999;
    color: ${props => props.theme.footer.color};
    background-color: ${props => props.theme.footer.bgColor};
    width: 100%;
`

const Footer = () => <Root>{config.footerText}</Root>

export default Footer
