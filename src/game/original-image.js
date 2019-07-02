import styled, { css } from 'styled-components'

const Image = styled.img`
    max-height: 600px;
    max-width: 600px;
    transition: all 0.3s;

    ${props => props.blurred && css`
        filter: blur(25px);
    `}
`

export default Image
