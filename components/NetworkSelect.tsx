import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Network from '../utils/networks'

interface NetworkSelectProps {
  selectedNetwork: Network
  setSelectedNetwork: React.Dispatch<React.SetStateAction<Network>>
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const networks: Record<Network, { name: string; etherscanAPI: string }> = {
  [Network.ETH]: { name: 'Ethereum Mainnet', etherscanAPI: 'etherscan' },
  [Network.ROPSTEN]: { name: 'Ropsten', etherscanAPI: 'ropsten' },
  [Network.RINKEBY]: { name: 'Rinkeby', etherscanAPI: 'rinkeby' },
  [Network.GOERLI]: { name: 'Goerli', etherscanAPI: 'goerli' },
  [Network.KOVAN]: { name: 'Kovan', etherscanAPI: 'kovan' }
}

function getStyles(name: string, networkName: string, theme: Theme) {
  return {
    fontWeight:
      networkName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function NetworkSelect({ selectedNetwork, setSelectedNetwork }: NetworkSelectProps) {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof selectedNetwork>) => {
    const {
      target: { value },
    } = event
    setSelectedNetwork(
      // On autofill we get a stringified value.
      value as Network
    )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, color: '#fff' }}>
        <InputLabel id="demo-multiple-name-label">Network</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedNetwork}
          onChange={handleChange}
          input={<OutlinedInput label="Network" />}
          MenuProps={MenuProps}
        >
          {(Object.keys(networks) as Network[]).map((network: Network) => (
            <MenuItem
              key={network}
              value={network}
              style={getStyles(networks[network].name, selectedNetwork, theme)}
            >
              {
                networks[network].name
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
