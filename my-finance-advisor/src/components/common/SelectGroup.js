
function SelectGroup(props) {
    const {
        /**
         * The id of the select element.
         */
        id,

        /**
         * Class of the select element.
         */
        className,

        /**
         * Id of the icon element.
         */
        iconId,

        /**
         * Icon to display for this element.
         */
        iconClass,

        /**
         * The action for the icon to perform when clicked.
         */
        iconAction = () => { return; },

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
        <div className="input-group mb-3">
            <span className="input-group-text"><em id={iconId} className={iconClass} onClick={() => iconAction()}></em></span>
            <select id={id} defaultValue={defaultPlaceholder} className="form-select" aria-label={ariaLabel}>
                <option value={defaultPlaceholder}>{defaultPlaceholder}</option>
                {optionsJsx}
            </select>
        </div>
    );
}

export default SelectGroup;