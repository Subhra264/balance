import { styled } from '@mui/material/styles'
import { PRIMARY_COLOR } from '../utils/colors'

const TextField = styled('input')(({theme}) => ({
	display: 'inline-block',
	padding: '6px 9px',
	border: 'none',
	outline: 'none',
	fontSize: '16px',
	background: PRIMARY_COLOR
}))

export default TextField