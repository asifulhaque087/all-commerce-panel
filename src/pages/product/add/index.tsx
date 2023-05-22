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
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { SelectChangeEvent } from '@mui/material/Select'
import Fab from '@mui/material/Fab'

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
import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material'

const FormLayoutsTabs = () => {
  // ** States

  const [attributeValues, setAttributeValues] = useState<number[]>([])
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty())
  const [value, setValue] = useState<string>('product-details')
  const [date, setDate] = useState<DateType>(null)

  interface Attribute {
    id: number
    name: string
  }

  const [attributes, setAttributes] = useState<Attribute[]>([])

  const [activeId, setActiveId] = useState<number | false>(false)

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleSelectAttributes = (event: SelectChangeEvent<string>) => {
    const newAtt = JSON.parse(event.target.value) as Attribute
    setAttributes([...attributes, newAtt])
  }

  const handleAttributeAccordion = (id: number) => (event: SyntheticEvent, isExpanded: boolean) => {
    setActiveId(isExpanded ? id : false)
  }

  const handleAttributeValues = (id: number) => {
    setAttributeValues([...attributeValues, id])
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
                  <CustomTextField
                    onChange={e => handleSelectAttributes(e as SelectChangeEvent<string>)}
                    select
                    fullWidth
                    defaultValue=''
                    label='Add Attributes'
                    id='custom-select'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={JSON.stringify({ id: 1, name: 'size' })}>Ten</MenuItem>
                    <MenuItem value={JSON.stringify({ id: 2, name: 'material' })}>Twenty</MenuItem>
                    <MenuItem value={JSON.stringify({ id: 3, name: 'third att' })}>Thirty</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>

              <Grid container>
                {attributes.map((att, i) => {
                  return (
                    <Grid item xs={12} sm={12}>
                      {/* <Accordion expanded={activeId == att.id} onChange={() => handleAttributeAccordion(att.id)}> */}
                      <Accordion expanded={activeId == att.id} onChange={handleAttributeAccordion(att.id)}>
                        <AccordionSummary
                          expandIcon={<Icon icon='tabler:chevron-down' />}
                          id='form-layouts-collapsible-header-1'
                          aria-controls='form-layouts-collapsible-content-1'
                        >
                          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                            {att.name}
                          </Typography>
                        </AccordionSummary>
                        <Divider sx={{ m: '0 !important' }} />
                        <AccordionDetails>
                          <Grid container spacing={5}>
                            {Array.from(Array(23), (e, i) => {
                              return (
                                <Grid item>
                                  <Chip
                                    label='Primary'
                                    color='primary'
                                    variant={`${attributeValues.includes(i) ? 'filled' : 'outlined'}`}
                                    onClick={() => handleAttributeValues(i)}
                                  />
                                </Grid>
                              )
                            })}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  )
                })}
              </Grid>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='add-variations'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Twitter' placeholder='https://twitter.com/carterLeonard' />
                </Grid>

                <Grid item xs={12} sm={12}>
                  {/* <Accordion expanded={activeId == att.id} onChange={() => handleAttributeAccordion(att.id)}> */}
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<Icon icon='tabler:chevron-down' />}
                      id='form-layouts-collapsible-header-1'
                      aria-controls='form-layouts-collapsible-content-1'
                    >
                      {/* <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                        hello
                      </Typography> */}

                      <Grid container alignItems={'center'} spacing={5}>
                        {Array.from(Array(5), (e, i) => {
                          return (
                            <Grid item>
                              <Chip label='Primary' color='primary' variant='outlined' />
                            </Grid>
                          )
                        })}

                        <Grid item ml={'auto'} mr={2}>
                          <Fab size='small' color='error' aria-label='edit'>
                            <Icon icon='tabler:trash' />
                          </Fab>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <Divider sx={{ m: '0 !important' }} />
                    {/* <AccordionDetails>
                      <Grid container spacing={5}>
                        form will be here
                      </Grid>
                    </AccordionDetails> */}
                  </Accordion>
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
