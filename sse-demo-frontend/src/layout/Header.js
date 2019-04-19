import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from "@material-ui/core/Chip";
import indigo from '@material-ui/core/colors/indigo';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
};

class Header extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Server Sent Events Demo
                        </Typography>
                        <Typography className={classes.grow} style={{paddingLeft: '1em'}} component={"div"}>
                            <Chip label={this.props.eventsReceivedCount + " events received"}
                                  style={{color: '#fff', background: indigo[400]}}/>
                        </Typography>
                        <Button variant="contained" color="secondary" href={"https://github.com/htrinter/sse-demo/"}
                                target={"_blank"}>
                            View Source on GitHub
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);