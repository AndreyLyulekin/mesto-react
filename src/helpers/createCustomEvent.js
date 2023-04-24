export const createCustomEvent = (eventName, payload) => {
    const event = new CustomEvent(eventName, {
      detail: payload,
      bubbles: true
    });
  
    document.dispatchEvent(event);
  };