

export const callStripeSession = async (formData) => {
  try {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};