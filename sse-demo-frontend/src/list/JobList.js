import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import JobListItem from "./JobListItem";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class JobList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let eventSource = new EventSource(`http://localhost:8080/api/event/jobstatus`);
        let eventHandler = m => {
            let newItem = JSON.parse(m.data);

            this.props.handleEventsReceivedCountIncrement();

            this.setState((prevState) => {
                let prevItems = prevState.items;
                if (prevItems.length >= 100) {
                    // Close eventSource after receiving data of 100 jobs, as to not crash the browser
                    eventSource.close();
                }

                let isUpdate = false;
                const updatedItems = prevItems.map((item) => {
                    if (item.id === newItem.id) {
                        isUpdate = true;
                        return newItem;
                    } else {
                        return item;
                    }
                });

                if (isUpdate) {
                    return {items: updatedItems};
                } else {
                    return {items: updatedItems.concat(newItem)};
                }
            });
        };
        eventSource.addEventListener('message', eventHandler, false);
    }

    render() {
        const {classes} = this.props;

        const listItems = this.state.items.map((item) =>
            <JobListItem item={item} key={item.id}/>
        );

        return (
            <List className={classes.root}>
                {listItems}
            </List>
        );
    }
}

JobList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(JobList);