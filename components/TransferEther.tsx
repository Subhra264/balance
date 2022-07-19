import { ChangeEvent, FormEvent, FormEventHandler, useContext, useState } from 'react'
import TextField from './TextField'
import { transferAmount } from '../utils/contractUtils'
import { LayoutContext } from '../utils/contexts'
import styles from '../styles/Form.module.css'

interface TransferEtherProps {
  to?: string
}

const TransferEther: React.FC<TransferEtherProps> = ({ to = '' }) => {

  const { ethereum, currentAddress } = useContext(LayoutContext)

  const [addressTo, setAddressTo] = useState(to)
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const onAddressToChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setAddressTo(ev.target.value)
  }

  const onAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setAmount(ev.target.value)
  }

  const onMessageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMessage(ev.target.value)
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    setIsSubmitting(true)

    const transaction = await transferAmount(
      ethereum,
      {
        from: currentAddress,
        to: addressTo,
        message,
        amount
      }
    )

    setIsSubmitting(false)
  }

  return (
    ethereum && <>
      <h3>Transfer</h3>
      <p
        style={{
          fontSize: '0.8rem',
          fontStyle: 'italic',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        This uses the selected metamask account network
      </p>
      <form onSubmit={onFormSubmit}>
        <TextField
          className={styles.formInput}
          type='text'
          name='addressTo'
          // label='To'
          placeholder='Receiver Address'
          value={addressTo}
          onChange={onAddressToChange}
        />
        <TextField
          className={styles.formInput}
          type='number'
          min={0}
          step={0.00000000000000001}
          // inputProps={{
          //   step: 0.001
          // }}
          name='amount'
          value={amount}
          onChange={onAmountChange}
        />
        <TextField
          className={styles.formInput}
          type='text'
          placeholder='Message'
          value={message}
          onChange={onMessageChange}
        />
        <TextField
          className={`${styles.formInput} ${styles.submitButton}`}
          type='submit'
          value={isSubmitting? 'Sending...' : 'Submit'}
        />
      </form>
    </>
  )
}

export default TransferEther