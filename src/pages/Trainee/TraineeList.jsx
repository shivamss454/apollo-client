import React from 'react';
import * as moment from 'moment';
import Compose from 'lodash.flowright';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  FormDialog, EditDialog, RemoveDialog,
} from './Components/index';
import Table from './Components/Table/Table';
import { graphql } from '@apollo/react-hoc';
import GET_TRAINEE from './query';

const useStyles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(-3),
    marginBottom: theme.spacing(2),
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: '',
      orderBy: '',
      selected: '',
      loading: true,
      editdialog: false,
      removedialog: false,
      newData: {},
      page: 0,
      rowsPerPage: 20,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true }, () => {
    });
  }

  handleClickClose = () => {
    this.setState({ open: false, editdialog: false, removedialog: false }, () => {
    });
  }

  handleSubmit = () => {
 this.setState({ open: false, editdialog: false, removedialog: false});
  }

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: event.target.value }, () => {
    });
  }

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  };

  handleEditDialogOpen = (data) => {
    this.setState({ editdialog: true, newData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ removedialog: true, newData: data });
  }

  Format = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  Convert = (email) => email.toUpperCase()


  handleChangePage = (refetch) => (_,newpage) => {
    const { rowsPerPage } = this.state;
    this.setState({page: newpage }, () => {
      refetch({skip: newpage * rowsPerPage, limit: rowsPerPage });
    });

  }

  render() {
    const { 
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    
    const {
      open, order, orderBy, page, rowsPerPage, editdialog,
      removedialog, newData,
    } = this.state;

    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button type="button" color="primary" className={classes.button} variant="outlined" onClick={this.handleClickOpen}>
            Add TraineeList
          </Button>
        </div>
        <FormDialog
          data={newData}
          open={open}
          onClose={this.handleClickClose}
          onSubmit={() => this.handleSubmit}
        />
        <EditDialog
          open={editdialog}
          onClose={this.handleClickClose}
          onSubmit={() => this.handleSubmit}
          data={newData}
        />
        <RemoveDialog
          open={removedialog}
          onClose={this.handleClickClose}
          onSubmit={() => this.handleSubmit}
          data={newData}
        />
        <Table
          id="table"
          data={records}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                align: 'left',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: this.Format,
              },
            ]
          }
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
              label: 'edit icon',
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
              label: 'delete icon',
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage(refetch)}
          onChangeRowsPerPage={this.handleRowsPerPage}
          loading={loading}
        />
      </div>
    );
  }
}
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Compose(
 withStyles(useStyles),
graphql(GET_TRAINEE, {
  data: {
    variables: {skip: 0, limit: 10}, 
  },
}),
)(Trainee);
