import * as PropTypes from "prop-types";

function DatePicker(props) {
    return null;
}

DatePicker.propTypes = {
    onChange: PropTypes.func,
    selectsStart: PropTypes.bool,
    endDate: PropTypes.any,
    dateFormat: PropTypes.string,
    placeholderText: PropTypes.string,
    selected: PropTypes.any,
    startDate: PropTypes.any
};

export default DatePicker;