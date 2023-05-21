// ** React Imports
import { ChangeEvent, forwardRef, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'

// ** Styled Component Import
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { EditorState } from 'draft-js'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsTabs = () => {
  // ** States
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty())
  const [value, setValue] = useState<string>('product-details')
  const [date, setDate] = useState<DateType>(null)
  const [language, setLanguage] = useState<string[]>([])
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='product-details' label='Product Details' />
          <Tab value='add-attributes' label='Add Attributes' />
          <Tab value='add-variations' label='Add Variations' />
        </TabList>
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='product-details'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Product Name' placeholder='t-shirt' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField select fullWidth label='Category' id='form-layouts-tabs-select' defaultValue=''>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                </Grid>

                {/* short description */}
                <Grid item xs={12} sm={12}>
                  <EditorWrapper>
                    <ReactDraftWysiwyg
                      placeholder='Short Description'
                      editorState={editorValue}
                      onEditorStateChange={data => setEditorValue(data)}
                    />
                  </EditorWrapper>
                </Grid>

                {/* long description */}

                <Grid item xs={12} sm={12}>
                  <EditorWrapper>
                    <ReactDraftWysiwyg
                      placeholder='Long Description'
                      editorState={editorValue}
                      onEditorStateChange={data => setEditorValue(data)}
                    />
                  </EditorWrapper>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='add-attributes'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Username' placeholder='carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth type='email' label='Email' placeholder='carterleonard@gmail.com' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Password'
                    value={values.password}
                    id='form-layouts-tabs-password'
                    onChange={handlePasswordChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    value={values.password2}
                    label='Confirm Password'
                    id='form-layouts-tabs-password-2'
                    onChange={handleConfirmChange('password2')}
                    type={values.showPassword2 ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmPassword}
                          >
                            <Icon fontSize='1.25rem' icon={values.showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='add-variations'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Twitter' placeholder='https://twitter.com/carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Facebook' placeholder='https://facebook.com/carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Google+' placeholder='https://plus.google.com/carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='LinkedIn' placeholder='https://linkedin.com/carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Instagram' placeholder='https://instagram.com/carterLeonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Quora' placeholder='https://quora.com/carterLeonard' />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' variant='tonal' color='secondary'>
              Reset
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

export default FormLayoutsTabs
