import React from 'react';
import * as moment from 'moment';
import Compose from 'lodash.flowright';
import { Mutation } from '@apollo/react-components';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  FormDialog, EditDialog, RemoveDialog,
} from './Components/index';
import Table from './Components/Table/Table';
import { MyContext } from '../../contexts/SnackbarProvider/SnackbarProvider';
import { graphql } from '@apollo/react-hoc';
import GET_TRAINEE from './query';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';

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
      editdialog: false,
      removedialog: false,
      newData: {},
      page: 0,
      rowsPerPage: 10,
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

  handleAddDialog = async (data, createTrainee, opensnackbar) => {
    const { name, email, password } = data;
    await createTrainee({ variables: { name, email, password } })
      .then(() => {
        opensnackbar('Trainee Added Successfully', 'success')
      })
      .catch((error) => {
        console.log(error);
        opensnackbar('something went wrong', 'error')
      })
    this.setState({ open: false });
  }

  handleEditDialog = async (data, updateTrainee, opensnackbar) => {
    const { name, email, id } = data;
    await updateTrainee({ variables: { name, email, id } })
      .then(() => {
        opensnackbar('Trainee updated Successfully', 'success')
      })
      .catch((error) => {
        console.log(error);
        opensnackbar('something went wrong', 'error')
      })
    this.setState({ editdialog: false });
  }

  handleRemoveDialog = async (data, deleteTrainee, opensnackbar) => {
    const { page, rowsPerPage } = this.state;
    const {
      data: {
        getTrainee: { count = 0 } = {},
        refetch,
      },
    } = this.props;
    const { id } = data;
    await deleteTrainee({ variables: { id } })
      .then(() => {
        opensnackbar('Trainee Deleted Successfully', 'success')
      })
      .catch((error) => {
        console.log(error);
        opensnackbar('something went wrong', 'error')
      })
    if (count - page * rowsPerPage === 1 && page > 0) {
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    }
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
    this.setState({ page: newpage }, () => {
      refetch({ skip: newpage * rowsPerPage, limit: rowsPerPage });
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
    const variables = { skip: page * rowsPerPage, limit: rowsPerPage };

    return (
      <Mutation
        mutation={DELETE_TRAINEE}
        refetchQueries={[{ query: GET_TRAINEE, variables }]}
      >
        {(deleteTrainee,deleteLoader={loading}) => (
          <Mutation
            mutation={CREATE_TRAINEE}
            refetchQueries={[{ query: GET_TRAINEE, variables }]}
          >
            {(createTrainee,createLoader={loading}) => (
              <Mutation
                mutation={UPDATE_TRAINEE}
                refetchQueries={[{ query: GET_TRAINEE, variables }]}
              >
                {(updateTrainee,updateLoader={loading}) => (
                  <MyContext.Consumer>
                    {({ opensnackbar }) => (
                      <>
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
                            loading={createLoader}
                            onSubmit={(data) => this.handleAddDialog(data,createTrainee,opensnackbar)}
                          />
                          <EditDialog
                            open={editdialog}
                            onClose={this.handleClickClose}
                            onSubmit={(data) => this.handleEditDialog(data,updateTrainee,opensnackbar)}
                            loading={updateLoader}
                            data={newData}
                          />
                          <RemoveDialog
                            open={removedialog}
                            onClose={this.handleClickClose}
                            onSubmit={(data) => this.handleRemoveDialog(data,deleteTrainee,opensnackbar)}
                            loading={deleteLoader}
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
                      </>
                    )
                    }
                  </MyContext.Consumer>
                )})
              </Mutation>
            )})
          </Mutation>
        )})
      </Mutation>
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
      variables: { skip: 0, limit: 10 },
    },
  }),
)(Trainee);
