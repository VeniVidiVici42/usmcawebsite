import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "react-materialize";

import { fetchMyProposals } from "../../../actions";
import { ProblemPreview, LoadMore } from "../../utilities";

class ProblemsTab extends React.Component {
  componentWillMount = () => {
    this.props.fetchMyProposals();
  }

  render() {
    const { proposals: { content, error, message } } = this.props;
    return (content && content.length > 0) ? (
      <Col s={12}>
        {
          content.map((proposal, key) => (
            <ProblemPreview problem={proposal} key={key} />
          ))
        }
        <LoadMore />
      </Col>
    ) : (
      <div>
        <p>No proposals made yet! Click <Link to="/propose">here</Link> to make problem proposals.</p>
      </div>
    );
  }
}

ProblemsTab.propTypes = {
  proposals: PropTypes.object.isRequired,
  fetchMyProposals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
        proposals: state.problems.myProposals
      }),
      mapDispatchToProps = dispatch => ({
        fetchMyProposals: () => {
          fetchMyProposals()(dispatch);
        }
      });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProblemsTab);
