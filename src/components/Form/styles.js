
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
 
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    backgroundColor: "#74c8f2",
    marginBottom: 10,
  },
  buttonClear: {
    backgroundColor: "#780012",
    marginBottom: 10,
  },
  formControl:{
    margin: '10px'
  },
  labelGoal:{
    fontFamily:'cursive',
    textAlign: 'start',
    fontSize: 'medium',
  }

}));