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
}))
