'use client';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254117411547?text=Hi%2C%20Zimora%20Technologies%2C%20I'm%20interested%20in%20your%20tech%20solutions%2C%20Can%20we%20chat%20about%20how%20you%20can%20help%20my%20business%3F"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="60"
        height="60"
      />
    </a>
  );
}
