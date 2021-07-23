import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';

import {
    Grid,
    Typography,
    CardMedia
} from '@material-ui/core'

import useStyles from './styles';

function Media(props) {
    const classes = useStyles();
    return (
        <Grid itemkey={props.item.Name}>
            <CardMedia
                className={classes.media}
                image={props.item.image}
                title={props.item.name}
            >
                <Typography className={classes.mediaCaption}>
                    {props.item.name}
                </Typography>
            </CardMedia>
        </Grid>
    )
}

function Basic(props) {
    const classes = useStyles();
    return (
        <Grid >
            <CardMedia
                className={classes.media}
                image={props.item}
            >
            </CardMedia>
        </Grid>
    )
}

export default class MiniCarousel extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            autoPlay: this.props.detail?false:true,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false
        }

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        })
    }

    render() {
        return (
            <div style={{ margin: "10px", color: "#494949", width: "95%" }}>
                <Carousel
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}

                >
                    {this.props.detail?
                        this.props.items.map((item, index) => {
                            return <Basic item={item} key={index} />
                        })
                        :
                        this.props.items.map((item, index) => {
                            return <Media item={item} key={index} />
                        })
                    }
                </Carousel>
            </div>
        )
    }
}