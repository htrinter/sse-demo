import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import SyncIcon from '@material-ui/icons/Sync';
import NewIcon from '@material-ui/icons/FiberNew';
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Typography} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
});

class JobListItem extends Component {

    render() {
        const item = this.props.item;

        let icon = null;
        if (item.status === 'IN_PROGRESS') {
            icon = <SyncIcon color="action"/>;
        } else if (item.status === 'FINISHED') {
            if (item.exitCode === 'ERROR') {
                icon = <ErrorIcon color="secondary"/>;
            } else {
                icon = <DoneIcon color="primary"/>;
            }
        } else {
            icon = <NewIcon color="action"/>;
        }

        return (
            <ListItem className={"item"}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    disableTypography={true}
                    primary={
                        <div>
                            <Typography variant={'subtitle1'}>{item.description}</Typography>
                            <Typography>{item.status === 'IN_PROGRESS' ? 'running' : item.status.toLowerCase() + (item.exitCode === 'ERROR' ? ' with errors' : '')}</Typography>
                        </div>
                    }
                    secondary={
                        <LinearProgress variant="determinate" value={item.completionPercentage}
                                        style={{margin: '1em 0'}}/>
                    }
                />

            </ListItem>
        );
    }

}

JobListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobListItem);