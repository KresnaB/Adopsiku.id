import { createTheme } from '@material-ui/core/styles';
const font = "'Poppins', sans-serif"
const theme = createTheme({
    palette: {
        primary: { main: '#FFB822' },
        secondary: { main: '#FFF3CE' },
    },
    typography:{
        fontFamily: font,
        button: {
            borderRadius: 30,
        }
    }
    
});

export default theme;