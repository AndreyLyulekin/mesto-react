export const createCustomEvent = (eventName, payload) => {
   const event = new CustomEvent(eventName, {
      detail: payload,
   });

   document.dispatchEvent(event);
};
