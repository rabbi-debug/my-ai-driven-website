const STYLE_ID = 'contact-view-styles';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .contact-view {
      display: flex;
      justify-content: center;
      padding: 3rem 1.5rem;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }

    .contact-form {
      width: 100%;
      max-width: 480px;
      background: #ffffff;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #ececec;
    }

    .contact-form__title {
      margin: 0 0 0.5rem;
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a1a1a;
    }

    .contact-form__subtitle {
      margin: 0 0 2rem;
      color: #6b6b6b;
      font-size: 0.95rem;
    }

    .contact-form__field {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
    }

    .contact-form__field label {
      margin-bottom: 0.4rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #333;
    }

    .contact-form__field input,
    .contact-form__field textarea {
      font: inherit;
      padding: 0.75rem 0.9rem;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      background: #fafafa;
      color: #1a1a1a;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      resize: vertical;
    }

    .contact-form__field input:focus,
    .contact-form__field textarea:focus {
      outline: none;
      border-color: #4f46e5;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .contact-form__submit {
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.85rem 1rem;
      border: none;
      border-radius: 10px;
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
    }

    .contact-form__submit:hover {
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
      transform: translateY(-1px);
    }

    .contact-form__submit:active {
      transform: translateY(0);
    }

    .contact-form__submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .contact-form__status {
      margin-top: 1rem;
      font-size: 0.9rem;
      text-align: center;
    }

    .contact-form__status--success {
      color: #16a34a;
    }

    .contact-form__status--error {
      color: #dc2626;
    }
  `;
  document.head.appendChild(style);
}

export function ContactView({ onSubmit } = {}) {
  injectStyles();

  const section = document.createElement('section');
  section.className = 'contact-view';
  section.innerHTML = `
    <form class="contact-form" novalidate>
      <h2 class="contact-form__title">Get in Touch</h2>
      <p class="contact-form__subtitle">We'd love to hear from you. Send us a message below.</p>

      <div class="contact-form__field">
        <label for="contact-name">Name</label>
        <input type="text" id="contact-name" name="name" placeholder="Your name" autocomplete="name" required />
      </div>

      <div class="contact-form__field">
        <label for="contact-email">Email</label>
        <input type="email" id="contact-email" name="email" placeholder="you@example.com" autocomplete="email" required />
      </div>

      <div class="contact-form__field">
        <label for="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" placeholder="How can we help?" required></textarea>
      </div>

      <button type="submit" class="contact-form__submit">Send Message</button>
      <p class="contact-form__status" role="status"></p>
    </form>
  `;

  const form = section.querySelector('form');
  const submitButton = section.querySelector('.contact-form__submit');
  const status = section.querySelector('.contact-form__status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'contact-form__status';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(data);
      }
      status.textContent = 'Thanks! Your message has been sent.';
      status.className = 'contact-form__status contact-form__status--success';
      form.reset();
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'contact-form__status contact-form__status--error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });

  return section;
}

export default ContactView;
