import logo from './openfaas.svg'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // color: '#25AEDD'
    color: '#394E55'
  },
  logo: {
    height: '40vmin'
  }
}))

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <motion.h3 animate={{ fontSize: 50 }} className={classes.text}>
          We're Celebrating!
        </motion.h3>
        <motion.img animate={{  }} src={logo} className={classes.logo}/>
      </div>
    </div>
  );
}

export default App;
