import { styled } from '@mui/material/styles'
import React from 'react'
import { PRIMARY_COLOR } from '../utils/colors'

const TextField = styled('input')(({theme}) => ({
	display: 'inline-block',
	padding: '12px 32px',
	border: 'none',
	outline: 'none',
	fontSize: '16px',
	background: PRIMARY_COLOR,
	minWidth: '20rem'
}))

// const IconTextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
// 	return (

// 	)
// }

export default TextField