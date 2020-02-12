import { connect } from 'react-redux';
import { userActionCreators } from './actions';

function mapStateToProps({ userState }) {
  return {
    userState,
  };
}

const mapDispatchToProps = userActionCreators;

export function connectUser(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
