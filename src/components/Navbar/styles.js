import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    fontFamily: 'cursive',
  },
  heading: {
    color: '#9098db',
    textDecoration: 'none',
    fontSize: '3em',
    fontWeight: 300,
    textShadow: "2px 2px #000000"
  },
  logout: {
    backgroundColor: "#780012",
    marginBottom: 10,
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-evenly;',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));