import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action);
    }
  }

  // OLD ADD METHOD
  // handleAddingNewTicketToList = (newTicket) => {
  //   const newMainTicketList = this.state.mainTicketList.concat(newTicket);
  //   this.setState({
  //     mainTicketList: newMainTicketList,
  //     formVisibleOnPage: false
  //   });
  // }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  // OLD SELECTED TICKET METHOD
  // handleChangingSelectedTicket = (id) => {
  //   const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
  //   this.setState({selectedTicket: selectedTicket});
  // }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  // OLD DELETE METHOD
  // handleDeletingTicket = (id) => {
  //   const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
  //   this.setState({
  //     mainTicketList: newMainTicketList,
  //     selectedTicket: null
  //   });
  // }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  // OLD EDIT METHOD
  // handleEditingTicketInList = (ticketToEdit) => {
  //   const editedMainTicketList = this.state.mainTicketList
  //     .filter(ticket => ticket.id !== this.state.selectedTicket.id)
  //     .concat(ticketToEdit);
  //   this.setState({
  //     mainTicketList: editedMainTicketList,
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

// Note: we are now passing mapStateToProps into the connect() function.

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;