import React from 'react';
import { connect } from 'react-redux';
import { fetchUserPlayers, fetchUserPlayersByPosition } from '../actions/players';

export class PlayerFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionValue: null,
        };

        this.filterPlayers = this.filterPlayers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            optionValue: event.target.value
        });
    }

    filterPlayers(event) {
        event.preventDefault();
        const filter = this.state.optionValue;
        if (filter === 'All') {
            return this.props.dispatch(fetchUserPlayers());
        } else if (filter === 'QB' || filter === 'RB' || filter === 'WR' || filter === 'TE') {
            return this.props.dispatch(fetchUserPlayersByPosition(filter))
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.filterPlayers}>
                    <label htmlFor="player-filter">Filter Players</label>
                    <select id="player-filter" onChange={this.handleChange}>
                        <option value="">--Filter by Position--</option>
                        <option value="QB">QB</option>
                        <option value="RB">RB</option>
                        <option value="WR">WR</option>
                        <option value="TE">TE</option>
                        <option value="All">All positions</option>
                    </select>
                    <button type="submit">Filter</button>
                </form>
            </div>
        );
    }
}

export default connect()(PlayerFilter);