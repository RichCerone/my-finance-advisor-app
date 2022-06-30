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
         * The message to display to the user.
         */
        message = "",

        /**
         * Type of message to display.
         */
        messageType = "info",

        /**
         * Whether the message is hidden on the page.
         */
        isHidden = false,

    } = this.props;

    if (!messageTypes.includes(messageType)) {
        throw new InvalidPropException(`${messageType} is an invalid prop parameter.`);
    }

    switch (messageType) {
        case "success":
            return <div id={id}></div>

        default: // 'info' message.
            return <div></div>
    }

}

export default Message;