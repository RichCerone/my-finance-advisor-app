
/**
 * Creates a generic select component.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Select(props) {
    const {
        /**
         * The id of the select element.
         */
        id,

        /**
         * Options to load into the select element.
         * They should be key-value pairs using the
         * Map class.
         */
        options = new Map(),

        /**
         * Aria label for accessibility.
         */
        ariaLabel = "",

        /**
         * Default select option text.
         */
        defaultPlaceholder = "Select..."

    } = props;

    // Create custom JSX options to display.
    let optionsJsx = [];
    if (options.size > 0) {
        for (const [key, value] of options.entries()) {
            optionsJsx.push(<option key={key} value={value}>{key}</option>);
        }
    }

    return (
        <select id={id} defaultValue={defaultPlaceholder} className="form-select" aria-label={ariaLabel}>
            <option value={defaultPlaceholder}>{defaultPlaceholder}</option>
            {optionsJsx}
        </select>
    );
}

export default Select;