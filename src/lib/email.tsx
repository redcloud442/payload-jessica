interface GetInTouchProps {
  FullName: string;
  Email: string;
  Message: string;
}

export function GetInTouch({ FullName, Email, Message }: GetInTouchProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#ffffff", // light sky blue background
        padding: "24px",
        borderRadius: "10px",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #0a0a0a",
      }}
    >
      <h2 style={{ color: "#0a0a0a", marginBottom: "16px" }}>
        New Contact Form Submission
      </h2>

      <p>
        Hey, <strong>{FullName}</strong> just submitted a contact form.
        <br />
        You might want to check the details below:
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #0a0a0a",
        }}
      >
        <p>
          <strong>Full Name:</strong> {FullName}
        </p>
        <p>
          <strong>Email:</strong> {Email}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <p
          style={{
            backgroundColor: "#ffffff",
            padding: "12px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {Message}
        </p>
      </div>

      <p style={{ fontSize: "13px", color: "#777", marginTop: "20px" }}>
        This email was sent automatically by your website&apos;s contact form
        system.
      </p>
    </div>
  );
}
