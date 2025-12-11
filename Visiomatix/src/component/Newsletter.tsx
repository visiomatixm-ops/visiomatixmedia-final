import { useState } from "react";
import { Button, Form } from "react-bootstrap";

type Status = "idle" | "loading" | "success" | "error";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("http://localhost:8080/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Failed to subscribe");

            setStatus("success");
            setMessage("Thank you for subscribing!");
            setEmail("");
        } catch (err) {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    }

    return (
        <div>
            <h6 className="fw-semibold text-uppercase">Stay Updated</h6>
            <p className="small mt-2">Subscribe for updates, trends, and insights.</p>

            <Form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2 mt-3">
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="rounded"
                    value={email}                         
                    onChange={(e) => setEmail(e.target.value)} 
                    required                              
                />

                <Button
                    type="submit"                         
                    disabled={status === "loading"}
                    className="subscribe-btn fw-semibold px-4 rounded"
                    style={{ backgroundColor: "#ffffffff", color: "#09324dff", border: "none" }}
                >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
            </Form>

            {message && (
                <p
                    className={`mt-3 text-center text-sm ${
                        status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default Newsletter;