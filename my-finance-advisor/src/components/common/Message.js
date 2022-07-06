import InvalidPropException from "../../exceptions/InvalidPropException";

/**
 * Creates a generic message.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Message(props) {
    const messageTypes = ["info", "success", "warning", "error"];

    const {
        /**
         * Id of the element.
         */
        id,

        /**
         * Class name for the icon to use.
         */
        iconClassName,

        /**
         * The message to display to the user.
         */
        message = "",

        /**
         * Type of message to display.
         */
        messageType = "info",

        /**
         * Whether this message can be dismissed.
         */
        dismissible = false,

        /**
         * Whether the message is hidden on the page.
         */
        isHidden = false,

    } = props;

    // Check if the given message type prop is valid.
    if (!messageTypes.includes(messageType.toLowerCase())) {
        throw new InvalidPropException(`${messageType} is an invalid prop parameter.`);
    }

    // Append css for hiding an element.
    let className;
    if (isHidden) {
        className = "d-none";
    }
    else {
        className = "";
    }

    // Append alert dismissible css.
    if (dismissible) {
        className += " alert-dismissible fade show";
    }

    // Based on message type, render the correct alert.
    switch (messageType.toLowerCase()) {
        case "info":
            className += " alert alert-info";
            if (dismissible) {
                return ( 
                    <div id={id} className={className} role="alert">
                        <em className={iconClassName}></em> {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                );
            }

            return ( 
                <div id={id} className={className} role="alert">
                    <em className={iconClassName}></em> {message}
                </div>
            );
        
        case "success":
            className += " alert alert-success";
            if (dismissible) {
                return ( 
                    <div id={id} className={className} role="alert">
                        <em className={iconClassName}></em> {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                );
            }

            return ( 
                <div id={id} className={className} role="alert">
                    <em className={iconClassName}></em> {message}
                </div>
            );

        case "warning":
            className += " alert alert-warning";
            if (dismissible) {
                return ( 
                    <div id={id} className={className} role="alert">
                        <em className={iconClassName}></em> {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                );
            }

            return ( 
                <div id={id} className={className} role="alert">
                    <em className={iconClassName}></em> {message}
                </div>
            );

        case "error":
            className = " alert alert-danger";
            if (dismissible) {
                return ( 
                    <div id={id} className={className} role="alert" hidden={isHidden}>
                        <em className={iconClassName}></em> {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                );
            }

            return ( 
                <div id={id} className="alert alert-danger" role="alert" hidden={isHidden}>
                    <em className={iconClassName}></em> {message}
                </div>
            );

        default: // 'info' message.
        if (dismissible) {
            return ( 
                <div id={id} className={className} role="alert">
                    <em className={iconClassName}></em> {message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        }

        return ( 
            <div id={id} className="alert alert-info" role="alert">
                <em className={iconClassName}></em> {message}
            </div>
        );
    }

}

export default Message;