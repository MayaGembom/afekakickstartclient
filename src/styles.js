import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    boxSizing: 'border-box',
    borderRadius: 8,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: '50px',
    fontFamily:'cursive',
    color: 'rgba(30, 139, 234, 0.79)',
  },
  footer: {
    fontFamily:'cursive',
    position: 'absolute',
    margin: '2%',
    textAlign: 'start',
    bottom: '0',
    width: '100%',
    height: '2.5rem',
  },

}));