import React, { Component } from 'react';
import ProfileForm from './ProfileForm'
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

export class ProfileListRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        };
        this.loadEditForm = this.loadEditForm.bind(this);
        this.handleFormCancel = this.handleFormCancel.bind(this);
    }

    render() {
        return (
            <div className='profile-item-container'>
                <div className='profile-row-container'>
                    <div className='profile-row-icon'><FontAwesome name='user-circle' /></div>
                    <div className='profile-row-info' onClick={() => this.setCurrentProfile()}>
                        <div className='profile-first-info-row'>
                            <div className='profile-row-name'> {this.props.profile.name } </div>
                            <div className='profile-row-alerts'>  {this.renderAlertBadge(this.state.alertCount) } </div>
                        </div>
                        <div className='profile-second-info-row'>
                            <div className='profile-row-age'> {this.computeAgeString(this.props.profile.dob)} </div>
                            <div className='profile-row-gender'> {this.props.profile.gender } </div>
                        </div>
                    </div>
                    <div className='profile-row-edit'>
                        { this.renderEditBtn(this.state.edit) }
                    </div>
                </div>
                { this.renderEditForm(this.state.edit) }
            </div>
        );
    }

    setCurrentProfile() {
        this.props.setCurrentProfile(this.props.profile.id);
	}

    loadEditForm() {
        this.setState({edit: true});
    }

    handleFormCancel() {
        this.setState({edit: false});
    }

    computeAgeString(dob) {
        let years = moment().diff(dob, 'years');
        let months = moment().diff(dob, 'months');
        let days = moment().diff(dob, 'days');
        if (years > 0) {
            return years + ' YRS';
        } else if (months > 0) {
            return months + ' MO';
        } else {
            return days + ' DAYS';
        }
    }

    renderAlertBadge(alertCount) {
        if (alertCount > 0) {
            return(<span className='badge badge-danger'> {this.state.alertCount } </span>);
        }
        return null;
    }

    renderEditBtn(edit) {
        if (!edit) {
        return(<a onClick={ this.loadEditForm }><FontAwesome name='edit' />  EDIT</a>);
        }
        return null;
    }

    renderEditForm(edit) {
        if (edit) {
            return(<ProfileForm deleteProfile={this.props.deleteProfile} saveProfile={this.props.updateProfile} profile={this.props.profile} cancel={this.handleFormCancel}/>);
        }
        return null;
    }
}

export default ProfileListRow;
