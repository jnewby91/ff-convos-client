//Import dependencies & modules
import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlayers } from '../actions/players';
import EditPlayerForm from './edit-player-form';
import LoadingPage from './loading-page';

export class EditPlayerPage extends React.Component {
    
    //Fetch players
    componentDidMount() {
        this.props.dispatch(fetchPlayers())
    }
    
    render() {
        //If loading, return loading page
        if (this.props.loading) {
            return <LoadingPage />
        }

        //Display success or error message
        let message;
        if (this.props.feedback) {
            switch(this.props.feedback.success) {
                case true:
                    message = <p className="form-success">{this.props.feedback.message}</p>;
                    break;
                case false:
                    message = <p className="form-error">{this.props.feedback.message}</p>;
                    break;
                default:
                    message = '';
            }
        }

        return (
            <section aria-live="polite">
                {message}
                <EditPlayerForm />
            </section>
        );
    }
}

const mapStateToProps = state => ({
    feedback: state.playersData.feedback,
    loading: state.playersData.loading
});

export default requiresLogin()(connect(mapStateToProps)(EditPlayerPage));