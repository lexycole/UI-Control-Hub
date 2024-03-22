import * as React from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import { OutlinedInput } from '@material-ui/core';
import {
    AppointmentForm,
  } from '@devexpress/dx-react-scheduler-material-ui';

import {getPatients} from './../services/patients';  
class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      patients: [],
      selectPatients: [],
    };


 


    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });

    console.log(this.state);
  }



  async populatePatients() {
		const { data: patients } = await getPatients();
		this.setState({ patients });
		this.selectPatients = this.state.patients.map(option => (
     {label:option.patients.contactName.first+" "+option.patients.contactName.last,  value:option.user}
  
		));
    this.setState({ selectPatients:this.selectPatients });
     console.log(this.state.selectPatients);
    }
  async componentDidMount() {
	
		await this.populatePatients();
	
	}

	


  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
      fullSize,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });


    const selectEditorProps = field => ({
      className: classes.select,
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
     
    });

    // this.handleChange = field =>({ target: change }) => this.changeAppointment({
    //   field: [field], changes: change.value,
    // });
    this.handleChange = ({target:input}) => {
      console.log(input);
      const appointmentChanges = { ...this.state.appointmentChanges };
      appointmentChanges[input.name] = input.value;
      this.setState({ appointmentChanges });
    };

   
    
    //AppointmentForm.SelectProps
    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };
    const {selectPatients} = this.state;
    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize={fullSize}
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('title')}
              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('location')}
              />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('notes')}
                multiline
                rows="6"
              />
            </div>

            <div className={classes.wrapper}>
         
            <Create className={classes.icon} color="action" />
            
           
           
              <FormControl>
          <InputLabel id="demo-simple-select-label">Patient</InputLabel>
          <Select
            labelId="patientNo"
            id="patientNo"
            name="patientNo"
            //defaultValue=""
            value={displayAppointmentData["patientNo"]}
            onChange={this.handleChange}
         
          >
            {/* {this.props.selectPatients}  */}

            {selectPatients.map(element => (
            <MenuItem
            value={element.value}
            key={element.value}
            >
            {element.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
            
            
     


            </div>

          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}
export default AppointmentFormContainerBasic;