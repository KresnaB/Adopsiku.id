import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    banner: {
        height: "270px",
        position: "relative",
    },
    media:{
        height: "270px",
        position: "relative",
        backgroundColor: theme.palette.primary.main,
        overflow: "hidden",
        transition: "300ms",
        cursor: "pointer",
        '&:hover': {
            filter: "brightness(115%)",
        }
    },
    mediaCaption: {
        textOverflow: "ellipsis",
        position: "absolute",
        bottom: 0,
        padding: "15px",
        backgroundColor: "black",
        color: "white",
        opacity: 0.6,
        width: "100%",
        height: "10%",
        font: {
            size: "25px",
            weight: 200,
        },
        transition: "300ms",
        cursor: "pointer",
        '&:hover': {
            opacity: 0.8,
        },
    },
    content : {
        color: "black",
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        position: "relative",
        cursor: "pointer",
        padding: "30px",
        transition: "300ms",
    },
    title:{
        marginTop:"20px",
        fontSize: "25px",
        fontWeight: 500
    },
    viewButton: {
        marginTop: "30px",
        color: "black",
        fontSize: "18px",
        backgroundColor: theme.palette.secondary.main,
        textTransform: "none",
        borderRadius: "1em",
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'black'
        },
    }
}))
