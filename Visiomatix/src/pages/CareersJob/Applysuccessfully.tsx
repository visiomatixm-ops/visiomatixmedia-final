import { CheckCircle, X } from "lucide-react";

const Applysuccessfully = ({onClose}: {onClose: () => void}) => {
    return (
        <div className="d-flex align-items-center justify-content-center border rounded shadow bg-light">
            <div className="p-4 w-100 text-center" style={{maxWidth: '28rem'}}>
                <button className="position-absolute top-0 end-0 text-muted"
                        onClick={onClose}
                >
                    <X className="fs-3" />
                </button>
                <CheckCircle className="text-success fs-1 mx-auto mb-4" />

                <h2 className="fs-4 fw-bold text-dark mb-2">
                    Application Submitted Successfully
                </h2>

                <p className="text-muted">
                    Thank you for applying! We’ll review your application and get back to you soon.
                </p>
            </div>
         </div>
    );
};

export default Applysuccessfully;
