import { useForm, ValidationError } from '@formspree/react';

export function ContactForm() {
  const [state, handleSubmit] = useForm("xovwgljn");
  if (state.succeeded) {
    return <p style={{ marginTop: 20 }}>👍 Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" required style={{ padding: '8px', width: '100%' }} />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message">Message (optional)</label>
      <textarea id="message" name="message" rows={3} style={{ padding: '8px', width: '100%' }} />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {state.submitting ? "Sending..." : "Join Updates"}
      </button>
    </form>
  );
}
