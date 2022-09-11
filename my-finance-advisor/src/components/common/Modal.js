
/**
 * Creates a generic modal.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Modal(props) {
    const {
        /**
         * The id of the modal.
         */
        id = "",

        /**
         * Title of this modal.
         */
        title = "",

        /**
         * Whether the modal has a static backdrop (cannot be closed by clicking out of it)
         */
        isStatic = false
    } = props;

    // If static is true, enable static backdrop.
    let staticBackdrop;
    if (isStatic) {
        staticBackdrop = "static"
    }   

    return(
        <div id={id} className="modal fade" data-bs-backdrop={staticBackdrop} tabIndex={-1} aria-labelledby={`${title}Label`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                    <div className="modal-footer">
                        {props.actions}
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Modal;