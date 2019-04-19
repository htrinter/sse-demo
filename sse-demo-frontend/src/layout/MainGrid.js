import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import JobList from "../list/JobList";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    }
});

class MainGrid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventsReceivedCount: 0
        };

        this.handleEventsReceivedCountIncrement = this.handleEventsReceivedCountIncrement.bind(this)
    }

    handleEventsReceivedCountIncrement() {
        this.setState(prevState => ({
            eventsReceivedCount: prevState.eventsReceivedCount + 1
        }));
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Header eventsReceivedCount={this.state.eventsReceivedCount}></Header>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={10} style={{margin: '0 auto'}}>
                        <Paper className={classes.paper} style={{margin: '6em 0'}}>
                            <JobList handleEventsReceivedCountIncrement={this.handleEventsReceivedCountIncrement}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

MainGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainGrid);